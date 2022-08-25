import { Injectable } from '@nestjs/common';
import { FooRepository } from './repositories/foo.repository';
import { ICRUDService } from 'artifacts/rds/core/common/interfaces/interface.crud.service';
import { FooDTO } from './dto/foo.dto';
import { Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { FooSearchDTO } from './dto/foo-search.dto';

@Injectable()
export class FooService implements ICRUDService<FooDTO, void> {
  constructor(private readonly fooRepository: FooRepository) {}

  async create(fooDTO: FooDTO): Promise<FooDTO> {
    const foo = await this.fooRepository.insert(fooDTO);
    return new FooDTO(foo);
  }

  async read(id: string): Promise<FooDTO> {
    const foo = await this.fooRepository.where({ id: id }, 'id').findOne();
    return new FooDTO(foo);
  }

  async search(fooSearchDTO: FooSearchDTO): Promise<ResponseDTO<FooDTO[]>> {
    this.fooRepository.page(fooSearchDTO.page, fooSearchDTO.limit);

    if (fooSearchDTO.query) {
      this.fooRepository.where({
        name: { [Op.iLike]: `%${fooSearchDTO.query}%` },
      });
    }
    if (fooSearchDTO.status && fooSearchDTO.status !== 'all') {
      this.fooRepository.where({
        status: fooSearchDTO.status,
      });
    }
    if (fooSearchDTO.orderBy) {
      if (fooSearchDTO.orderType === 'asc') {
        this.fooRepository.order(fooSearchDTO.orderBy, 'ASC');
      } else {
        this.fooRepository.order(fooSearchDTO.orderBy, 'DESC');
      }
    }
    if (fooSearchDTO.between && fooSearchDTO.betweenDate) {
      const betweenCondition = {};
      betweenCondition[fooSearchDTO.between] = {
        [Op.between]: [
          new Date(fooSearchDTO.getStartDate()).toUTCString(),
          new Date(fooSearchDTO.getEndDate()).toUTCString(),
        ],
      };
      this.fooRepository.where(betweenCondition);
    }

    const fooDTOs: FooDTO[] = [];
    const responseDTO = new ResponseDTO<FooDTO[]>();

    if (fooSearchDTO.count) {
      const { count, rows } = await this.fooRepository.findAndCountAll({
        distinct: true,
      });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(fooDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        fooDTOs,
        await this.fooRepository.findAll(),
      );
    }
    return responseDTO;
  }

  async update(updateDTO: FooDTO): Promise<FooDTO> {
    updateDTO.updatedAt = new Date();

    const fooUpdated = await this.fooRepository.update(updateDTO, {
      where: { id: updateDTO.id },
      returning: true,
    });

    return new FooDTO(fooUpdated[1][0]);
  }

  async delete(id: string): Promise<any> {
    return {
      deleteCount: await this.fooRepository.where({ id: id }).delete(),
    };
  }
}

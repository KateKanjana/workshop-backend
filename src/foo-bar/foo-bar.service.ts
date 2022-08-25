import { BadRequestException, Injectable } from '@nestjs/common';
import { VIEW, FooBarRepository } from './repositories/foo-bar.repository';
import { Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { FooBarDTO } from './dto/foo-bar.dto';
import { FooBarSearchDTO } from './dto/foo-bar-search.dto';
import { BarFooDTO } from './dto/bar-foo.dto';
import { FooBarRelationDTO } from './dto/foo-bar-relation.dto';

@Injectable()
export class FooBarService {
  constructor(private readonly fooBarRepository: FooBarRepository) {}

  async create(view: string, fooBarDTO: any): Promise<FooBarDTO> {
    const fooBar = await this.fooBarRepository.include(view).insert(fooBarDTO);

    return new FooBarDTO(fooBar);
  }

  async createFooBarRelation(
    fooBarRelationDTO: FooBarRelationDTO,
  ): Promise<FooBarRelationDTO> {
    const fooBarRelation = await this.fooBarRepository
      .getFooBarRelationRepository()
      .insert(fooBarRelationDTO);

    return new FooBarRelationDTO(fooBarRelation);
  }

  async read(view: string, id: string): Promise<any> {
    const fooBar = await this.fooBarRepository
      .include(view)
      .where({ id: id }, 'id')
      .findOne();
    if (view === VIEW.FOO_BAR) {
      return new FooBarDTO(fooBar);
    } else if (view === VIEW.BAR_FOO) {
      return new BarFooDTO(fooBar);
    }
    throw new BadRequestException('view is not valid');
  }

  async search(
    view: string,
    fooBarSearchDTO: FooBarSearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    this.fooBarRepository.include(view);

    // pagination option
    this.fooBarRepository.page(fooBarSearchDTO.page, fooBarSearchDTO.limit);

    // search text option
    if (fooBarSearchDTO.query) {
      this.fooBarRepository.where({
        name: { [Op.iLike]: `%${fooBarSearchDTO.query}%` },
      });
    }
    // filter status option
    if (fooBarSearchDTO.status && fooBarSearchDTO.status !== 'all') {
      this.fooBarRepository.where({
        status: fooBarSearchDTO.status,
      });
    }
    // filter with category id
    if (fooBarSearchDTO.id) {
      this.fooBarRepository.where({
        id: fooBarSearchDTO.id,
      });
    }
    // order by option
    if (fooBarSearchDTO.orderBy) {
      if (fooBarSearchDTO.orderType === 'asc') {
        this.fooBarRepository.order(fooBarSearchDTO.orderBy, 'ASC');
      } else {
        this.fooBarRepository.order(fooBarSearchDTO.orderBy, 'DESC');
      }
    }
    // date range filter option
    if (fooBarSearchDTO.between && fooBarSearchDTO.betweenDate) {
      const betweenCondition = {};
      betweenCondition[fooBarSearchDTO.between] = {
        [Op.between]: [
          new Date(fooBarSearchDTO.getStartDate()).toUTCString(),
          new Date(fooBarSearchDTO.getEndDate()).toUTCString(),
        ],
      };
      this.fooBarRepository.where(betweenCondition);
    }

    const fooBarSearchDTOs: any[] = [];
    const responseDTO = new ResponseDTO<any[]>();

    if (fooBarSearchDTO.count) {
      const { count, rows } = await this.fooBarRepository.findAndCountAll({
        distinct: true,
      });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(fooBarSearchDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        fooBarSearchDTOs,
        await this.fooBarRepository.findAll(),
      );
    }
    return responseDTO;
  }

  async update(view: string, updateDTO: any): Promise<any> {
    updateDTO.updatedAt = new Date();

    const fooBarUpdated = await this.fooBarRepository.update(updateDTO, {
      where: { id: updateDTO.id },
      returning: true,
    });

    if (view === VIEW.FOO_BAR) {
      return new FooBarDTO(fooBarUpdated[1][0]);
    } else if (view === VIEW.BAR_FOO) {
      return new BarFooDTO(fooBarUpdated[1][0]);
    } else {
      return fooBarUpdated;
    }
  }

  async delete(fooId: string, barId: string): Promise<any> {
    return {
      deleteFooCount: await this.fooBarRepository
        .getFooRepository()
        .where({ id: fooId })
        .delete(),
      deletefooBarRelationCount: await this.fooBarRepository
        .getFooBarRelationRepository()
        .where({ fooId: fooId })
        .delete(),
      deleteBarCount: await this.fooBarRepository
        .getBarRepository()
        .where({ id: barId })
        .delete(),
    };
  }
}

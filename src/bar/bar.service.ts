import { Injectable } from '@nestjs/common';
import { BarRepository } from './repositories/bar.repository';
import { ICRUDService } from 'artifacts/rds/core/common/interfaces/interface.crud.service';
import { BarDTO } from './dto/bar.dto';
import { Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { BarSearchDTO } from './dto/bar-search.dto';

@Injectable()
export class BarService implements ICRUDService<BarDTO, void> {
  constructor(private readonly barRepository: BarRepository) {}

  async create(barDTO: BarDTO): Promise<BarDTO> {
    const bar = await this.barRepository.insert(barDTO);
    return new BarDTO(bar);
  }

  async read(id: string): Promise<BarDTO> {
    const bar = await this.barRepository.where({ id: id }, 'id').findOne();
    return new BarDTO(bar);
  }

  async search(barSearchDTO: BarSearchDTO): Promise<ResponseDTO<BarDTO[]>> {
    this.barRepository.page(barSearchDTO.page, barSearchDTO.limit);

    if (barSearchDTO.query) {
      this.barRepository.where({
        name: { [Op.iLike]: `%${barSearchDTO.query}%` },
      });
    }
    if (barSearchDTO.status && barSearchDTO.status !== 'all') {
      this.barRepository.where({
        status: barSearchDTO.status,
      });
    }
    if (barSearchDTO.orderBy) {
      if (barSearchDTO.orderType === 'asc') {
        this.barRepository.order(barSearchDTO.orderBy, 'ASC');
      } else {
        this.barRepository.order(barSearchDTO.orderBy, 'DESC');
      }
    }
    if (barSearchDTO.between && barSearchDTO.betweenDate) {
      const betweenCondition = {};
      betweenCondition[barSearchDTO.between] = {
        [Op.between]: [
          new Date(barSearchDTO.getStartDate()).toUTCString(),
          new Date(barSearchDTO.getEndDate()).toUTCString(),
        ],
      };
      this.barRepository.where(betweenCondition);
    }

    const barDTOs: BarDTO[] = [];
    const responseDTO = new ResponseDTO<BarDTO[]>();

    if (barSearchDTO.count) {
      const { count, rows } = await this.barRepository.findAndCountAll({
        distinct: true,
      });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(barDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        barDTOs,
        await this.barRepository.findAll(),
      );
    }
    return responseDTO;
  }

  async update(updateDTO: BarDTO): Promise<BarDTO> {
    updateDTO.updatedAt = new Date();

    const barUpdated = await this.barRepository.update(updateDTO, {
      where: { id: updateDTO.id },
      returning: true,
    });

    return new BarDTO(barUpdated[1][0]);
  }

  async delete(id: string): Promise<any> {
    return {
      deleteCount: await this.barRepository.where({ id: id }).delete(),
    };
  }
}

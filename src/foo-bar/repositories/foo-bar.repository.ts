import { Injectable } from '@nestjs/common';
import { AssociateRepository } from 'artifacts/rds/core/associate.repository';
import { BarRepository } from 'src/bar/repositories/bar.repository';
import { FooRepository } from 'src/foo/repositories/foo.repository';
import { FooBarRelationRepository } from './foo-bar-relation.repository';

export enum VIEW {
  FOO_BAR = 'foo-bar',
  BAR_FOO = 'bar-foo',
}

@Injectable()
export class FooBarRepository extends AssociateRepository {
  constructor(
    private readonly fooRepository: FooRepository,
    private readonly barRepository: BarRepository,
    private readonly fooBarRelationRepository: FooBarRelationRepository,
  ) {
    super();
  }

  protected init() {
    // this will be null when start server side foo
    return this.fooRepository.getModel();
  }

  // Override include method for model selection;
  include(view: string): AssociateRepository {
    if (view === VIEW.FOO_BAR) {
      this.model = this.fooRepository.getModel();
    } else if (view === VIEW.BAR_FOO) {
      this.model = this.barRepository.getModel();
    } else {
      this.model = this.init();
    }
    return super.include(view);
  }

  getFooRepository() {
    return this.fooRepository;
  }

  getBarRepository() {
    return this.barRepository;
  }

  getFooBarRelationRepository() {
    return this.fooBarRelationRepository;
  }

  protected setupAssociation(associateFetch: Map<string, any>): void {
    // re init because need to wait until root repository init model
    // this.model = this.init();

    this.fooRepository.getModel().belongsToMany(this.barRepository.getModel(), {
      through: 'foo_bar_relations',
      as: 'bars',
    });

    this.barRepository.getModel().belongsToMany(this.fooRepository.getModel(), {
      through: 'foo_bar_relations',
    });

    associateFetch.set(VIEW.FOO_BAR, [
      {
        model: this.barRepository.getModel(),
        as: 'bars',
        through: {
          // attributes: [], // without pivot table
          as: 'fooBarRelations',
        },
      },
    ]);

    associateFetch.set(VIEW.BAR_FOO, [
      {
        model: this.fooRepository.getModel(),
        as: 'foos',
        through: {
          // attributes: [], // without pivot table
          as: 'fooBarRelations',
        },
      },
    ]);
  }
}

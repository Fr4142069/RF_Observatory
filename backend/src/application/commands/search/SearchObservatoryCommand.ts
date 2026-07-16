import { SearchCriteriaDTO } from '../../dto/search/SearchCriteriaDTO';

export class SearchObservatoryCommand {
  public readonly criteria: SearchCriteriaDTO;

  constructor(dto: SearchCriteriaDTO) {
    this.criteria = dto;
  }
}

export class Land {

  public name: string;
  public city: string;

  public rights: string;
  public restrictions: string;
  public responsibilities: string;

  constructor(name: string, city: string, rights: string, restrictions: string, responsibilities: string) {
    this.name = name;
    this.city = city;
    this.rights = rights;
    this.restrictions = restrictions;
    this.responsibilities = responsibilities;
  }
}

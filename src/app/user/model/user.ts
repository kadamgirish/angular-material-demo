export class User {

  id?: number;
  name: string;
  dateOfBirth: Date;
  gender: string;
  job: string;
  description: string;

  constructor(id: number = null,
              name: string = '', dateOfBirth: Date = new Date(), gender: string = '', job: string = '', description: string = '') {
    this.id = id;
    this.name = name;
    this.dateOfBirth  = dateOfBirth ;
    this.gender = gender;
    this.job = job;
    this.description = description;
  }
}

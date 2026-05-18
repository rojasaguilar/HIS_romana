import validator from 'validator';

export class LabFileVO {
  private constructor(
    private url: string,
    private name: string,
    private uploadedAt: Date,
  ) {
    this.validate();
  }

  private validate() {
    if (this.url.length <= 0) throw new Error('File URL can not be empty');

    if (!validator.isURL(this.url)) throw new Error('Invalid URL');

    if (this.name.length <= 3) throw new Error('File name not valid');
  }

  public static create(data: {
    url: string;
    name: string;
    uploadedAt: Date;
  }): LabFileVO {
    return new LabFileVO(data.url, data.name, data.uploadedAt);
  }
}

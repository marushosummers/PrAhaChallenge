export class User {
  public readonly id: number
  public readonly name: string
  public readonly image: string
  public readonly protected: boolean

  public constructor(props: { id: number, name: string, image: string, protected: boolean }) {
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
    this.protected = props.protected;
  }
}

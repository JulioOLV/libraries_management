import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "authors",
})
export default class AuthorModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid", length: 36, nullable: false })
  id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  surname!: string;

  @Column({ type: "int", nullable: false })
  age!: number;
}

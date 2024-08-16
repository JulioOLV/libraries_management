import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import LibraryModel from "./library.model";

@Entity({
  name: "addresses_libraries",
})
export default class AddressLibraryModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid", length: 36, nullable: false })
  id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  city!: string;

  @Column({ type: "varchar", length: 2, nullable: false })
  state!: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  street!: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  number!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  district!: string;

  @Column({ type: "varchar", length: 9, nullable: false, name: "zip_code" })
  zipCode!: string;

  @Column({ name: "libraryId" })
  libraryId!: string;

  @OneToOne(() => LibraryModel, (library) => library.address)
  @JoinColumn({ name: "libraryId" })
  library!: Relation<LibraryModel>;
}

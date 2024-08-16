import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import AddressLibraryModel from "./address-library.model";

@Entity({
  name: "libraries",
})
export default class LibraryModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid", length: 36, nullable: false })
  id!: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  name!: string;

  @OneToOne(() => AddressLibraryModel, (address) => address.library, {
    cascade: true,
  })
  address!: Relation<AddressLibraryModel>;
}

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  Relation,
} from "typeorm";

import { BookCollectionTheme } from "@/modules/book-collection-adm/domain/book-collection/enums/book-collection-theme.enums";
import BookModel from "../../../book/repository/typeorm/book.model";

@Entity({
  name: "book_collections",
})
export default class BookCollectionModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid", length: 36, nullable: false })
  id!: string;

  @Column({
    type: "varchar",
    length: 30,
    enum: BookCollectionTheme,
    nullable: false,
  })
  theme!: BookCollectionTheme;

  @Column({ type: "varchar", length: 36, nullable: false })
  libraryId!: string;

  @OneToMany(() => BookModel, (book) => book.bookCollection)
  books!: Relation<BookModel[]>;
}

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import BookCollectionModel from "../../../book-collection/repository/typeorm/book-collection.model";

@Entity({
  name: "books",
})
export default class BookModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid", length: 36, nullable: false })
  id!: string;

  @Column({ type: "varchar", length: "150", nullable: false })
  name!: string;

  @Column({ type: "int", nullable: false })
  edition!: number;

  @Column({ type: "int", nullable: false })
  releaseYear!: number;

  @Column({ type: "int", nullable: false })
  totalPages!: number;

  @Column({ type: "varchar", length: 36, nullable: false })
  authorId!: string;

  @ManyToOne(
    () => BookCollectionModel,
    (bookCollection) => bookCollection.books
  )
  bookCollection!: Relation<BookCollectionModel>;
}

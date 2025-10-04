/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { Query } from "mongoose";
import { excludeField } from "./constants";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter = { ...this.query };

    // Remove any fields that should be excluded
    for (const field of excludeField) {
      delete filter[field];
    }

    // Check if status is provided and handle filtering by the last status in trackingEvents
    if (filter.status) {
      this.modelQuery = this.modelQuery.find({
        trackingEvents: {
          $elemMatch: {
            status: filter.status,
          },
        },
      }); 

      delete filter.status;
    }

    // Apply any other filters that are left (excluding status)
    if (Object.keys(filter).length > 0) {
      this.modelQuery = this.modelQuery.find(filter);
    }

    return this;
  }

  // Search by term on specified fields
  search(searchableFields: string[]): this {
    const searchTerm = this.query.searchTerm || "";
    const searchQuery = {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    };
    this.modelQuery = this.modelQuery.find(searchQuery);
    return this;
  }

  // Sort by a specified field (defaults to createdAt)
  sort(): this {
    const sort = this.query.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // Select specific fields to return in the result
  fields(): this {
    const fields = this.query.fields?.split(",").join(" ") || "";

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  // Pagination handling
  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // Build the query
  build() {
    return this.modelQuery;
  }

  // Get pagination metadata
  async getMeta(queryId?:{senderId?:string,receiverId?:string}) {
   

    let countQuery = this.modelQuery.model.countDocuments();

    // Check if senderId or receiverId exists in the query
    if (queryId?.senderId) {
      countQuery = this.modelQuery.model.countDocuments({
        senderInfo: queryId.senderId,
      });
    } else if (queryId?.receiverId) {
      countQuery = this.modelQuery.model.countDocuments({
        reciverInfo:queryId.receiverId,
      });
    }

    // Get the total document count based on sender or receiver
    const totalDocuments = await countQuery;
    

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(totalDocuments / limit);

    return { page, limit, total: totalDocuments, totalPage };
  }
}

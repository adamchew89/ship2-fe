import { Slice } from "@reduxjs/toolkit";

export enum StatusType {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export enum RequestStatusType {
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
  PENDING = "pending",
}

abstract class SliceRedux {
  public name: string;
  public slice: Slice;

  constructor(name: string) {
    this.name = name;
    this.slice = this.initializeSlice();
  }

  abstract initializeSlice(): Slice;
}

export default SliceRedux;

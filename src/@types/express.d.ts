// New types can be added to existing packages like this. It will include all
// my custom types with the pkg

declare namespace Express {
  export interface Request {
    userId: string;
  }
}

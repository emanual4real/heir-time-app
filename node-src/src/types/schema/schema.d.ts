/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/Item/{id}": {
    /** Get an item */
    get: {
      parameters: {
        query?: {
          projectId?: string;
        };
        path: {
          id: number;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Item"];
            "application/json": components["schemas"]["Item"];
            "text/json": components["schemas"]["Item"];
          };
        };
      };
    };
    /** Deletes a file */
    delete: {
      parameters: {
        query?: {
          projectId?: string;
        };
        path: {
          id: number;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": number;
            "application/json": number;
            "text/json": number;
          };
        };
      };
    };
  };
  "/api/Item": {
    /** Get all items from project */
    get: {
      parameters: {
        query?: {
          projectId?: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Item"][];
            "application/json": components["schemas"]["Item"][];
            "text/json": components["schemas"]["Item"][];
          };
        };
      };
    };
    /** Update item and file */
    put: {
      parameters: {
        query?: {
          projectId?: string;
        };
      };
      requestBody?: {
        content: {
          "multipart/form-data": {
            itemJson?: string;
            /** Format: binary */
            file?: string;
          };
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Item"];
            "application/json": components["schemas"]["Item"];
            "text/json": components["schemas"]["Item"];
          };
        };
      };
    };
    /** Create a new item with file */
    post: {
      requestBody?: {
        content: {
          "multipart/form-data": {
            itemWithFileInput?: string;
            /** Format: binary */
            file?: string;
          };
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Item"];
            "application/json": components["schemas"]["Item"];
            "text/json": components["schemas"]["Item"];
          };
        };
      };
    };
  };
  "/api/Item/bid": {
    /** Update bit on item */
    put: {
      parameters: {
        query?: {
          projectId?: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["BidInput"];
          "text/json": components["schemas"]["BidInput"];
          "application/*+json": components["schemas"]["BidInput"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Item"];
            "application/json": components["schemas"]["Item"];
            "text/json": components["schemas"]["Item"];
          };
        };
      };
    };
  };
  "/api/Item/winner": {
    /** Set the winner of the item */
    put: {
      parameters: {
        query?: {
          projectId?: string;
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["WinnerInput"];
          "text/json": components["schemas"]["WinnerInput"];
          "application/*+json": components["schemas"]["WinnerInput"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Item"];
            "application/json": components["schemas"]["Item"];
            "text/json": components["schemas"]["Item"];
          };
        };
      };
    };
  };
  "/api/Project": {
    /** Get the user's projects */
    get: {
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Project"][];
            "application/json": components["schemas"]["Project"][];
            "text/json": components["schemas"]["Project"][];
          };
        };
      };
    };
    /** Create a new project */
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["Project"];
          "text/json": components["schemas"]["Project"];
          "application/*+json": components["schemas"]["Project"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Project"];
            "application/json": components["schemas"]["Project"];
            "text/json": components["schemas"]["Project"];
          };
        };
      };
    };
  };
  "/api/Project/{projectId}": {
    /** Get a specific project */
    get: {
      parameters: {
        path: {
          projectId: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Project"];
            "application/json": components["schemas"]["Project"];
            "text/json": components["schemas"]["Project"];
          };
        };
      };
    };
    /** Delete a project */
    delete: {
      parameters: {
        path: {
          projectId: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": string;
            "application/json": string;
            "text/json": string;
          };
        };
      };
    };
  };
  "/api/User/me": {
    get: {
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["User"];
            "application/json": components["schemas"]["User"];
            "text/json": components["schemas"]["User"];
          };
        };
      };
    };
  };
  "/api/User/{email}": {
    get: {
      parameters: {
        path: {
          email: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["User"];
            "application/json": components["schemas"]["User"];
            "text/json": components["schemas"]["User"];
          };
        };
      };
    };
  };
  "/api/User": {
    get: {
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["User"][];
            "application/json": components["schemas"]["User"][];
            "text/json": components["schemas"]["User"][];
          };
        };
      };
    };
  };
  "/api/User/login": {
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["Login"];
          "text/json": components["schemas"]["Login"];
          "application/*+json": components["schemas"]["Login"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: never;
        };
      };
    };
  };
  "/api/User/logout": {
    get: {
      responses: {
        /** @description Success */
        200: {
          content: never;
        };
      };
    };
  };
  "/api/User/register": {
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["User"];
          "text/json": components["schemas"]["User"];
          "application/*+json": components["schemas"]["User"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["User"];
            "application/json": components["schemas"]["User"];
            "text/json": components["schemas"]["User"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Bid: {
      /** Format: int32 */
      value?: number;
      /** Format: date-time */
      receivingDate?: string;
      user?: string | null;
      /** Format: date-time */
      createdAt?: string | null;
    };
    BidInput: {
      /** Format: int32 */
      value?: number;
      /** Format: int32 */
      itemId?: number;
      receivingDate?: string | null;
    };
    /** @description Item to be auctioned off */
    Item: {
      /** Format: int32 */
      id?: number | null;
      title?: string | null;
      /** Format: date-time */
      releaseDate?: string;
      itemStatus?: components["schemas"]["Status"];
      statusName?: string | null;
      description?: string | null;
      location?: string | null;
      fileUrls?: string[] | null;
      fileKeys?: string[] | null;
      recipient?: string | null;
      bids?: components["schemas"]["Bid"][] | null;
    };
    Login: {
      emailAddress?: string | null;
      password?: string | null;
    };
    Project: {
      id?: string | null;
      projectName?: string | null;
      owner?: string | null;
      admins?: string[] | null;
      users?: string[] | null;
      items?: components["schemas"]["Item"][] | null;
    };
    /**
     * Format: int32
     * @enum {integer}
     */
    Status: 0 | 1 | 2;
    User: {
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      emailAddress?: string | null;
      password?: string | null;
      isAdmin?: boolean | null;
      ownedProjects?: string[] | null;
      projects?: string[] | null;
      phoneNumber?: string | null;
      address?: string | null;
    };
    WinnerInput: {
      userId?: string | null;
      /** Format: int32 */
      itemId?: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;

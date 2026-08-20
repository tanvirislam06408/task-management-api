# Playlist Module Flow

This folder contains the code for creating playlists.

## Folder contents

- `playlists.module.ts`: Connects the playlist controller, service, and repositories.
- `playlists.controller.ts`: Receives HTTP requests for `/playlists`.
- `playlists.service.ts`: Contains the playlist creation logic.
- `playlist.entity.ts`: Describes how a playlist is stored in the database.
- `dto/create-playlists.ts`: Describes and validates the data accepted when creating a playlist.

## Application setup

`AppModule` imports `PlayListModule`. This makes the playlist feature available in the NestJS application.

The playlist module registers these TypeORM entities:

- `Playlist`
- `Song`
- `User`

Registering them allows NestJS to inject their repositories into `PlayListsService`.

## Create playlist request flow

1. A client sends a `POST` request to `/playlists`.
2. `PlayListsController.create()` receives the request body.
3. NestJS validates the body using `CreatePlayListDto` and the global `ValidationPipe`.
4. The controller passes the DTO to `PlayListsService.create()`.
5. The service creates a new `Playlist` object and copies the playlist name.
6. The service uses the song IDs from `songs` to find the matching songs.
7. The matching songs are assigned to `playlist.songs`.
8. The service uses the user ID from `user` to find the owner.
9. If the user does not exist, the service throws a `NotFoundException`.
10. The user is assigned to `playlist.user`.
11. The playlist repository saves the playlist and returns the saved record.

## Request body

```json
{
  "name": "Morning playlist",
  "songs": [1, 2, 3],
  "user": 1
}
```

- `name` is the playlist name.
- `songs` is an array of existing song IDs.
- `user` is the ID of an existing user.

## Database relationships

- One `User` can have many playlists.
- Each `Playlist` belongs to one `User`.
- A `Playlist` can contain many songs through the `Playlist.songs` relation.
- Each `Song` points back to its playlist through `Song.playList`.

## Important notes

- Only songs found by the supplied IDs are assigned. The current service does not reject the request when one or more song IDs do not exist.
- The DTO should give `name` and `songs` explicit TypeScript types:

```ts
readonly name: string;
readonly songs: number[];
```

- Authentication is not connected yet. The request currently supplies the user ID directly. Later, this should come from the authenticated user instead of trusting the request body.

# photo-album-api

## `GET /albums`

Returnerar alla album (exkl. foton).


## `GET /albums/:albumId`

Returnerar ett album, inkl. foton.


## `POST /albums`

Skapar ett nytt, tomt album.


## `PUT /albums/:albumId`

Uppdaterar ett albums attribut.


## `POST /albums/:albumId/photos`
```json
{
  "photo_id": 2
}
```

Lägger till foto med ID 2 till albumet.


## `POST /albums/2/photos`

```json
{
  "photo_id": 7
}

Tar bort fotot med ID 7 från albumet med ID 2.
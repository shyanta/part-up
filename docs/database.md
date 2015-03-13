# Database Design

## User

## Relations

- Notifications: fully embedded.
- Tags: name embedded. Name is linked directly to the name field in the Tags collection.
- Networks: just id. Id links to Networks collection.
- Partups: just id. Id links to Partups collection.
- Followers: just id. Id links to Users collection.
- Follows: just id. Id links to Users collection.
- Supports: just id. Id links to Users collection.

## Notifications

## Partup

### Relations

- Tags: name embedded. Name is linked directly to the name field in the Tags collection.
- Network: just id. Id links to Networks collection.
- Activities: fully embedded.
- Updates: fully embedded.
- Uppers: id, name and image embedded. Id links to Users collection.
- Supporters: id, name and image embedded. Id links to Users collection.
- Budget: fully embedded.

## Update

### Relations

- Actor: id, name and image embedded. Id links to Users collection.

## Comment

- User: id and name. Id links to Users collection.

# Comments

- Invitations to Partups are not saved.
- Comments on Activity or Update?
- Updates history?

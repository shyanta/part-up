# Images fail recovery

- Remove all default user pictures from the database (by hand)

Migrations:
- Download all facebook + linkedin profile pictures for existing social users
- Set default profile picture for all users that loggedin with password service


Remove all default profile pictures:
- db.cfs.images.filerecord.remove({'meta.default_profile_picture': true})

# Images fail recovery
- set to single servo
- backup mongo 
- Empty bucket
- Remove all default user pictures from the database (by hand)
    - db.cfs.images.filerecord.remove({})
- deploy application with TEMP_DIR
- see error, let default pictures load
- reset lock
- restart appliciation
- deploy application with CLOUD_DIR

Migrations:
- Download all facebook + linkedin profile pictures for existing social users
- Set default profile picture for all users that loggedin with password service


Remove all default profile pictures:

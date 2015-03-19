Part-Up
=======

## Collections

### Partups
- ID
- creator_id
- name (string)
- description (string)
- location (object)
    - city (string)
    - country (string)
- networks (array of objects)
    - ID
    - name
- tags (array of tag IDs, tag ID is the name of the tag so need for extra query)
- start_date (ISODate)
- end_date (ISODate)
- image (object)
- uppers (array of user IDs. Since online status has to be fetched anyway, there is no use for embedding) 
- supporters (array of user objects)
    - ID
    - name
    - image
- activities (array of activity IDs)
- anticontracts (array of object)
    - ID
    - activities (array of current activity copy objects)
        - ID
        - name
        - created_by
            - ID
            - name
            - image
        - contributions
            - upper
                - ID
                - name
                - image
            - types (array of objects)
                - type (string: wants/has/can)
                - type_data
                    - amount (int)
                    - description (string) 
    - signed_by_all (bool)
    - uppers_signed (array of user objects)
        - ID
        - name
        - image
        - date (ISODate)
- status (string)
- created_at (ISODate)
- updated_at (ISODate)

Note: the budget can be built from array of activities, so no need for including those separate IDs.
If we would choose to embed the budget, it would be pretty write-heavy because it has to be updated on each activity addition/update.

### Activities
- ID
- partup_id
- name (string)
- created_by
    - ID
    - name
    - image
- description (string)
- start_date (ISODate)
- end_date (ISODate)
- contributions (array of objects)
    - upper
        - ID
        - name
        - image
    - types (array of objects)
        - type (string: wants/has/can)
        - type_data
            - amount (int)
            - description (string)
    - feedbacks (array of objects)
        - upper
            - ID
            - name
            - image
        - rating
        - description
    - created_at (ISODate)
    - updated_at (ISODate)
- created_at (ISODate)
- updated_at (ISODate)

### Updates
- ID
- partup_id
- type (string: update/message/etc)
- type_data (object)
    - upper 
        - ID
        - name
        - image
    - old_value (string)
    - new_value (string)
- comments (array of objects)
    - ID
    - upper
        - ID
        - name
    - content
    - date (ISODate)
- created_at (ISODate)
- updated_at (ISODate)

### Uppers
- ID
- name (string)
- email (string)
- password (string)
- description (string)
- location (string or object)
- image (object)
- networks (array of objects)
    - ID
    - name
- website (string)
- phone (string)
- tags (array of tag IDs, tag ID is the name of the tag so need for extra query)
- partups (array of partup IDs)
- supports (array of partup IDs
- followers (array of upper IDs)
- follows (array of upper IDs)
- facebook (string)
- twitter (string)
- instagram (string)
- linked_in (string)
- skype (string)
- online (bool)
- notification_settings
    - mention (bool)
    - activity_update (bool)
    - contribution_update (bool)
    - new_message (bool)
    - new_comment (bool)
    - anticontract_signed (bool)
    - new_watcher (bool)
    - new_follower (bool)
    - partup_invite (bool)
    - daily_partup_overview (bool)
    - newsletter (bool)
- created_at (ISODate)
- updated_at (ISODate)

### Tags
- ID (name of tag)
- count
- created_at (ISODate)

### Notifications
- ID
- for_upper_id
- type (string)
- type_data (object)
    - by_upper
        - ID
        - name
        - image
- created_at (ISODate)
- updated_at (ISODate)
- new (bool)

### Networks
- ID
- name (string)
- accessibility (not sure yet)



## Comments and questions
- Invitations to Partups are not saved.
- Comments on Activity or Update?
- Updates history?
- Does the budget reflect the current situation, or the latest signed anti-contract? 
- What are the 2 covered questions in 20-partup-starten1.png? 

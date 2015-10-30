DUMP_PATH=$1

for f in $DUMP_PATH/*.bson; do [ -f "$f" ] && bsondump "$f" > "$f.json"; done

cat $DUMP_PATH/users.bson.json | sed 's/accessToken" : "[^"]*"/accessToken" : ""/g' > $DUMP_PATH/users.bson-clean-1.json
cat $DUMP_PATH/users.bson-clean-1.json | sed 's/hashedToken" : "[^"]*"/hashedToken" : ""/g' > $DUMP_PATH/users.bson-clean-2.json
cat $DUMP_PATH/users.bson-clean-2.json | sed 's/bcrypt" : "[^"]*"/bcrypt" : ""/g' > $DUMP_PATH/users.bson-clean-3.json
cat $DUMP_PATH/users.bson-clean-3.json | sed 's/token" : "[^"]*"/token" : ""/g' > $DUMP_PATH/users.bson-clean-4.json
mv $DUMP_PATH/users.bson-clean-4.json $DUMP_PATH/users.bson.json
rm $DUMP_PATH/users.bson-clean-*.json

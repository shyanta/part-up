### Release process for developers

 1. Peer-review the code changes you've made.
 2. If everything is OK, create a new branch ```git checkout -b MD*.**.* // whatever release version you need ``` Please check the [CHANGELOG.md](https://github.com/part-up/part-up/blob/develop/CHANGELOG.md) to understand the version management of this project.  For more information about Semantic Versioning please take a look at: http://semver.org/
 3. Update the CHANGELOG.md.

 For each fix or feature changes please include the commit message/description and if possible the related issue number, eg. ```fix(emails): fixed commenter name in "conversation reply email", fix #141```
 4. Commit your updated CHANGELOG.md.

 **Tip**: ``` git commit -am "docs(changelog): add changelog MD*.**.* // whatever release version you need" ```
 5. Tag your latest commit using the version number as described in changelog using ```git tag -a 1.16.3 -m "" ``` and push the tag to the repository using ```git push origin 1.16.3.```
 6. Push the release branch to the origin using ```git push origin```
 7. After the push Jenkins will automatically build the tag release. Please go to http://ci.part-up.com/view to see the build. You can compare the build with the latest commit SHA.
 8. After the build is finished on Jenkins you can go to the **PROJECT_ROOT/devops** folder and start to deploy an image tag to the **acceptance** server. Run the **./devops** shell script:
 ``` ./devops provision acceptance all --tags=app```
 The system will ask you:
  ``` Which image tag do you want to deploy? [latest]: {{COPY_PASTE_HERE_THE_LATEST_COMMIT_SHA}}```
  Please provide the latest relase tag commit SHA. Check **devops/inventories/*.yml** to see all the available deployment server instances.
 9. Check your deployment on acceptance https://pu-acceptance.lifely.nl. Open your browser console and type: ``` Version.get() ```
 10. To deploy it to **production** server repeat step 8 - 9, but change the deploy command to  ``` ./devops provision production all --tags=app``` (change ***acceptance*** to **production**)
 11. Let the people of the part-up open source development community know that you've just made a new release by adding a new message on the part-up messages board.  
 12.  Last but not least please merge your release branch back into master and finally master into develop. For example:
```
git checkout master
git merge MD1.16.2 --no-ff
git checkout develop
git merge master
git push origin
```

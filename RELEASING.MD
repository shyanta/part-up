
## Release process for developers

For the release process we're using a gulp plugin for managing semver releases using conventional changelog.
Check plugin: [gulp-conventional-release](https://github.com/aaronroberson/gulp-conventional-release)

 1. Peer-review the code changes you've made.
 2. If everything is OK, create a new branch ```git checkout -b MD*.**.* // whatever release version you need ``` Please check the [CHANGELOG.md](https://github.com/part-up/part-up/blob/develop/CHANGELOG.md) to understand the version management of this project.  For more information about Semantic Versioning please take a look at: http://semver.org/
 3. Run `npm run release` (this will stage and commit the changes, bump the version in package.json, run conventional-changelog to update the changelog, tag the version, and push the changes)
 4. After the push Jenkins will automatically build the tag release. 
 
    Please go to http://ci.part-up.com/view to see the build. You can compare the build with the latest commit SHA.
 5. After the build is finished on Jenkins you can go to the **PROJECT_ROOT/devops** folder start to deploy an image tag to the **acceptance** server. 
    
    Run the **./devops** shell script:
     ``` 
     ./devops provision acceptance all --tags=app
     ```
    The system will ask you:
    ``` 
    Which image tag do you want to deploy? [latest]: {{COPY_PASTE_HERE_THE_LATEST_COMMIT_SHA}}
    ```
    Please provide the latest relase tag commit SHA. Check **devops/inventories/\*.yml** to see all the available deployment server instances.
 6. Check your deployment on acceptance https://pu-acceptance.lifely.nl. Open your browser console and type: ``` Version.get() ```
 7. To deploy it to **production** server repeat step 8 - 9, but change the deploy command to  ``` ./devops provision production all --tags=app``` (change ***acceptance*** to **production**)
 8. Let the people of the part-up open source development community know that you've just made a new release by adding a new message on the part-up messages board.  
 9. Merge your release branch back into master and finally master into develop. For example:
    
    ```
    git checkout master
    git merge MD1.16.2 --no-ff
    git checkout develop
    git merge master
    git push origin  
    ```
  10. Generate GitHub release notes with    **(GitHub personal token is required)**.
  
  ```
  npm run release-notes
  ``` 
  
  ![screen shot 2016-08-08 at 21 07 35](https://cloud.githubusercontent.com/assets/617876/17492466/3d33262c-5dac-11e6-9f60-ad55886f74b8.png)

   
  Steps to create GitHub Personal Token (skip the steps if you already have one)
  1. Go to [Create new token](https://github.com/settings/tokens/new)
  2. Fill in the token name `CONVENTIONAL_GITHUB_RELEASER_TOKEN` and check all the **repo** scope.
  3. Copy your generated token.
  4. Open your `~/.bash_profile` and add 
  
  ```
  CONVENTIONAL_GITHUB_RELEASER_TOKEN=[YOUR COPIED TOKEN]
  ```
 
  
   
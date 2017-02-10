#!/bin/bash

set -eu

# Doing this in two steps so that the script fails if GIT_BRANCH is not set.
git_branch=${GIT_BRANCH}

image_tag=${git_branch#*/}
image_name="partup/partup:${image_tag}"

echo "{\"version\": \"`git describe`\", \"deploydate\": \"`date +\"%Y-%m-%dT%H:%M:%SZ\"`\"}" > app/public/VERSION

mkdir -p app-build

cd app
meteor npm install --production
meteor build ../app-build
cd -

echo "Building the final image.."
docker build --pull -t ${image_name} .

tag=$(git describe --exact-match 2>/dev/null || echo "")
if [ $tag ]; then
  echo "Creating a docker image for tag (version): $tag"
  docker tag ${image_name} partup/partup:$tag
  docker push partup/partup:$tag
fi

docker push ${image_name}

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/r05323045/mealfinder.git master:gh-pages

cd -
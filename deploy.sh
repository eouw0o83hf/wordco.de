export AWS_PROFILE=personal
rm -rf ./dist
npm run-script build
aws s3 rm --recursive s3://wordco.de
pushd dist
aws s3 cp . s3://wordco.de --recursive --acl public-read
popd

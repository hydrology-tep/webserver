#!/bin/bash
# This script checkout submodules from svn

subdir=submodules
file=$subdir/submodules.txt

if [ ! -f $file ]
	then
	echo "Error: file $file not found!";
	exit 1;
fi

cat $file | while read dir	git	location	branch; 
do 
	if [ $2 = "develop" ]; then
   		branch="develop"
	else
  		if [ $2 = "master" ]; then
  			branch="master"
  		fi
	fi
	echo "git clone $git --branch $branch $subdir/root/$location/$dir";
	rm -rf $subdir/root/$location/$dir
	git clone $git --branch $branch $subdir/root/$location/$dir
done;

#!/bin/bash
pugEnd='.pug'
mdEnd='.md'
function pugText() {
  echo "extends ../reveal.pug

block title
  title OEC Chapter ${1}

block slides
  include ${1}.md";
}

for (( i = 1; i < 37; i++ )); do
  # touch chapters/$i/$pugEnd chapters/$i$mdEnd
  pugText $i > chapters/$i/$i$pugEnd
done
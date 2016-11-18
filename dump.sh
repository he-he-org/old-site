#!/bin/bash
mysqldump --user=root hehe > migrations/dumps/$(date +"%Y-%m-%d-%H-%M-%S").sql

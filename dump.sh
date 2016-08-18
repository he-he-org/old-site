#!/bin/bash
mysqldump hehe > migrations/dumps/$(date +"%Y-%m-%d-%H-%M-%S").sql

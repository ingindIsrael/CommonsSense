# Pepper Value Backup and Restore Documentation

## Overview

This document outlines the procedures for backing up and restoring cryptographic pepper values used in our password hashing system. Proper management of these values is critical for maintaining system security and ensuring user authentication continues to function correctly.

## Importance of Pepper Backups

Pepper values are cryptographic secrets used to enhance password security. If these values are lost:
- Users will be unable to authenticate
- Password hashes cannot be verified
- Recovery may be impossible without a backup

## Backup Procedures

### Automatic Backups

Our system automatically creates backups in the following scenarios:
1. Before and after pepper rotation (every 90 days)
2. When manually triggered via the admin API

### Manual Backup Creation

To manually create a backup:

**Using the Admin API:** 
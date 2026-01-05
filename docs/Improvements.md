---
title: Improvements
showGroups: true
---
# Improvements

## CQRS Architecture

The project is already structured to facilitate the implementation of CQRS architecture. The domain objects are already present and the commands/queries used to retrieve Pokemon or the translations are already present.

A message bus can be introduced, refactoring the logic present in the commands/queries handlers in order to segregate the concerns and make the code more maintainable.

## KPI Monitoring

The project is already structured to facilitate the implementation of KPI monitoring.
The exported interface `src/Application/Shared/Monitoring/MonitorInterface.ts` can be used to implement a monitoring system and track the performance of the application, of the external services and any other business KPIs.

## GDPR Compliance

*Not applicable to this project.*

In general, GDPR Compliance is required when an application handles personal data, such as user data, payment data, etc.

## Security

It would be possible to implement an authentication system to protect the APIs, and a rate limiting system to prevent abuse.

## Logging

A basic system is already in place, but for production use it would be better to use a structured logger and a more advanced system, such as ELK Stack or similar.
Furthermore it's recommended to implement an anonymization method to prevent leak of personal data.

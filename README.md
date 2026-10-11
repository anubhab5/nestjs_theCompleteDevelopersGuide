# Feature: Validation Pipes and DTO Validation

This branch focuses on validating incoming request data using NestJS DTOs and validation pipes.

> Note: This README is intended for learning and review. Git does not reliably enforce ordinary read-only file permissions across branches or clones, so this documentation should be treated as a maintenance artifact rather than a security boundary. It is not meant to be made immutable in a way that blocks normal Git workflow or future updates.

## 1. Feature overview

This feature introduces the idea that request payloads should be validated before business logic runs. In NestJS, the usual pattern is:

- define a DTO
- decorate properties with validation rules
- use a `ValidationPipe`
- allow the request body to be transformed and validated before it reaches the controller method

The application in this branch is structured to demonstrate the core flow used in real-world APIs.

## 2. Concepts explained

### DTOs
A DTO (Data Transfer Object) describes the shape of incoming data.

Example:

```ts
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content!: string;
}
```

This tells NestJS and `class-validator` that the `content` field must be a string.

### ValidationPipe
A `ValidationPipe` checks incoming request payloads against the DTO metadata and automatically rejects invalid input.

Typical configuration:

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

### Why this matters
Without validation:

- invalid data can reach service logic
- malformed requests may cause runtime errors
- business rules are harder to enforce consistently

With validation:

- the API returns a clean 400 error for bad input
- your controller receives expected types and shapes
- your code is easier to reason about and test

## 3. Files created or modified

This branch centers around the message DTO and request validation flow.

- `src/messages/dtos/create-message.dt.ts`
- `src/messages/messages.controller.ts`
- `README.md`

The branch is intentionally narrow: it demonstrates validation concerns without introducing unrelated features.

## 4. Implementation walkthrough

### Step 1: Define the contract
The DTO is the contract for the request payload. In this project, `CreateMessageDto` describes the message content value.

### Step 2: Add validation decorators
The `@IsString()` decorator ensures the request property is a valid string. This is the simplest possible validation rule and a good starting point for learning more decorators such as `@IsNotEmpty()`, `@IsNumber()`, `@Min()`, and `@Length()`.

### Step 3: Inject the DTO into the controller
The controller uses the DTO as the body type:

```ts
@Post()
createMessage(@Body() body: CreateMessageDto) {
  return body;
}
```

### Step 4: Enable validation in NestJS
In a real app, validation is enabled with a global or route-level `ValidationPipe`.

```ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

This ensures every incoming payload is checked before reaching your handlers.

## 5. Important code snippets

### DTO example

```ts
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content!: string;
}
```

### Controller example

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dt';

@Controller('messages')
export class MessagesController {
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return body;
  }
}
```

### Global validation example

```ts
app.useGlobalPipes(new ValidationPipe({ transform: true }));
```

## 6. Required dependencies and configuration

To use DTO validation in NestJS, install the validation packages:

```bash
npm install class-validator class-transformer
```

Then ensure the app is configured to use a validation pipe. The core idea is to validate request data before it reaches the controller service layer.

## 7. API examples

### Valid request

```http
POST /messages
Content-Type: application/json

{
  "content": "Hello from NestJS"
}
```

Expected result:

- request is accepted
- controller receives a matching DTO object

### Invalid request

```http
POST /messages
Content-Type: application/json

{
  "content": 123
}
```

Expected result:

- NestJS rejects the request
- response is a validation error (typically HTTP 400)

## 8. Commands to run and test the feature

```bash
npm install
npm run start:dev
```

Test via an HTTP client such as Postman, Insomnia, or curl:

```bash
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{"content":"hello"}'
```

Invalid payload example:

```bash
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{"content":123}'
```

## 9. Expected results

When the validation pipe is enabled properly:

- valid strings pass
- invalid types fail early
- the request cannot silently slip through to service logic with incorrect data types
- error output is consistent and easier to debug

## 10. Common mistakes and troubleshooting

### Missing validation package
If validation is not working, confirm both packages are installed:

```bash
npm install class-validator class-transformer
```

### Pipe not enabled
If requests are not being validated, check whether `ValidationPipe` is registered globally or on the route.

### Incorrect decorator usage
Make sure decorators are applied to the property and that the property name matches the incoming JSON field.

### Using wrong DTO import path
A common mistake is importing from the wrong folder or mismatching the DTO name in the controller.

## 11. Learning exercises

1. Add a second field to the DTO such as `author` and validate it with `@IsString()`.
2. Add `@IsNotEmpty()` and test empty strings.
3. Add a `@MinLength(3)` rule and try different payloads.
4. Add a custom validation rule for a field that must match a specific business rule.
5. Compare validation behavior with and without a global `ValidationPipe`.

## 12. Next concept ideas

After this feature, the next natural topics to explore are:

- exception filters
- custom validation pipes
- DTO transformation with `transform: true`
- authentication and guards
- testing request validation

This branch intentionally stays focused on the validation pattern so it remains easy to understand and review.

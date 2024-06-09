# **Typing Assets** - enhance your *TypeScript*
### Powerful library for *TypeScript*, that provides better typing support with additional *utility generics* and *typing predicates*

This library was made for advanced *TypeScript* users, if you do not now what is *type guard*, *assert* keyword, *utility generics*, then you should read blogs below and then come back to this library
+ [Utility types official docs]()
+ [Asserters guide](https://blog.logrocket.com/assertion-functions-typescript/)
+ [Type guards guide](https://blog.logrocket.com/how-to-use-type-guards-typescript/)
---
### What **Typing Assets** can do?

Additional **utility** types
+ New utility types will make your type aggregation more comfortable
+ You don't need to provide your own utility types in your project, just import this library
+ Full type safety

Type **predicators generation**
+ Now you don't need to write asserters and guards by your own, just use `generatePredicates` function, and it will generate both **guard** and **asserter** for your type based on given params
+ You can generate **guard** or **asserter** separately
+ Full type safety, just if like you writed the **guard**
+ *Conditional* (custom) **type guard** generation by validation function
+ ***100%* Test coverage**

**Property aggregation** functions
+ Pick and remove properties with *type safety*
+ ***100%* Test coverage**

### Usage:
```TypeScript
import {isSameType} from "typing-assets/src"

// false
isSameType(1, "1", [1])

```

### Documantation map:
> [**Utility types**](#utility-generic-types)
>> [`DeepOptional`](#deepoptionalt) - makes all nested properties optional 
>> 
>> [`DeepRequired`](#deeprequiredt) - makes all nested properties required
>>
>> [`ValueOf`](#valueoft) - extracts union type of values from object
>>
>> [`FromArray`](#fromarrayt) - extracts union type from array
>> 
>> [`ExcludeNullable`](#excludenullablet) - excludes all nested *nullable* types from unions in object
>>
>> [`ExcludeActual`](#excludeactualt) - excludes all nested *non-nullable* types from unions in object
>> 
>> [`ActualReturnType`](#actualreturntypet) - return type of function without *Promise* generic and *Awaited* keyword
>> 
> [**Predicates**](#predicates)
>> [`generateGuard`](#generateguard) - generates type guard function by provided type checking property and it's *primitive type*, for ex. `generateGuard(user, "name", "string")`
>>
>> [`generateConditionalGuard`](#generateconditionalguard) - generates type guard function by provided validation callback
>>
>> [`generateAsserter`](#generateasserter) - generates type asserter function by provided validation callback
>>
>> [`generatePredicates`](#generatepredicates) - generates both type asserter and guard. Has 2 overloads for generating by property primitive and by validation callback
>> 
> [**Property aggregators**](#property-aggergators)
>> [`excludeProperties`](#excludeproperties) - excludes provided properties with type safety
>>
>> [`pickProperties`](#pickproperties) - picks provided properties with type safety
---

## Utility generic types:

### `DeepOptional<T>`

Making all nested fields optional. Returns `T` type if it is not extending `object`
```TypeScript
type User = {
    name: string
    age: number
    cc: {
        code: string
        cvv: number
    }
}

/*
*  name?: string
*  age?: number
*  cc?: {
*      code?: string
*      cvv?: number
*  }
*/
type OptionalUser = DeepOptional<User>
```
---
### `DeepRequired<T>` 
Making all nested fields required. Returns `T` type if it is not extending `object`
```TypeScript
type User = {
    name: string
    age: number
    cc?: {
        code?: string
        cvv: number
    }
}

/*
*  ...
*  cc: {
*      code: string
*      cvv: number
*  }
*/
type RequiredlUser = DeepRequired<User>
```
---
### `ValueOf<T>` 
Exports union of all possible values (works also with arrays)
```TypeScript
// type A = string
type A = ValueOf<string[]>

// type B = string | number
type B = ValueOf<{ "1": "1", "2": 2 }>
```
---

### `FromArray<T>` 

Exports value specifically from array. Returns `T` if it is not array
```TypeScript
// type A = string
type A = FromArray<string[]>
```
---

### `ExcludeNullable<T>` 

Excludes all nullable unions in nested fields

```TypeScript
/* a: {
*    b: string;
*    c: string;
*  };
*  x: number;
*/
type A = ExcludeNullable<
    {
        a: {
            b: string |null | void 
            c: string
        }
        x: number undefined
    }
>
```

---

### `ExcludeActual<T>` 

Excludes all primitive types from union type in nested properties
```TypeScript
/*
*  {
*    a: {
*        b: void | null;
*        c: never;
*    };
*    x: undefined;
*  }
*/
type A = ExcludeActual<
    {
        a: {
            b: string | null | void 
            c: string
        }
        x: number | undefined
    }
>
```
---
### `ActualReturnType<T>` 

Works like `ReturnType` but automatically resolves promises types and excludes nullable values
```TypeScript
function f (): Promise<void | string | undefined>
// A = string
type A = ActualReturnType<typeof f>
```
---

## Predicates:


+ Type guards and asserters works better with *branded types*, for more information about branded types you can check out [this](https://www.youtube.com/watch?v=rpw59rajUSI) video

### `isSameType` 

Takes *1* to *n* arguments, returns *true* if arguments are same type, *false* if not
```TypeScript
// true
const foo = isSameType("a", "b", "")

// false
const bar = isSameType("a", 1)
```
---

### `generateGuard` 

Generates `type guard` by *property and its primitive type* (basic type guard). Uses for 
```TypeScript
type User = {
    name: string
    age: number
    cc: {
        code: string
        cvv: number
    }
}

const isUser = generateGuard(
    "name", "string"
)

// true
isUser({
    name: "Jason",
    age: 19,
    cc: {
        code: "1234 5678 9101 1121",
        cvv: 890
    }
})
```
---

### `generateConditionalGuard` 

Generates `type guard` functions that guards *by the callback function provided in argument*
```TypeScript
type User = {
    name: string
    age: number
    cc: {
        code: string
        cvv: number
    }
}

const isUser = generateConditionalGuard(
    (entity: unknown) => (entity as User).cc.code.startsWith("1")
)

// true
isUser({
    name: "Jason",
    age: 19,
    cc: {
        code: "1234 5678 9101 1121",
        cvv: 890
    }
})

```

---
### `generateAsserter` 

Generates `type asserter`, that throws error if provided object *does not follow provided conditions* (opposite of `type guard`). `isValid` callback should be like in `generateConditionalGuard` function argument
```TypeScript
type User = {
    name: string
    age: number
    cc: {
        code: string
        cvv: number
    }
}

const assertUser = generateAsserter(
    (source: unknown) => (source as User).сс.code.startsWith("34"),
    "Your cc code does not starts with 34"
)

// throw `Error("Your cc code does not starts with 34")`
assertUser({
    name: "Jason",
    age: 19,
    cc: {
        code: "1234 5678 9101 1121",
        cvv: 890
    }
})
```

---

### `generatePredicates` 
Generates both *asserter* and *guard* for promoted type. Has 2 overloads. First generates predicates with provided *validator callback*, second generates predicates via provided property and its primitive type. Both overloads requires *error message* at first argument
```TypeScript
type User = {
    name: string
    age: number
    cc: {
        code: string
        cvv: number
    }
}

const predicates: Predicates<User> = generatePredicates<User>(
    "User is not 18 yo",
    (source: unknown) => {return (source as User).age > 18}
)


const user = {
    name: "Pedro",
    age: 17,
    cc: {
        code: "1231 2312 3132",
        cvv: 123
    }
}

// throws 'Error("User is not 18 yo")'
predicates.assert(user)

// true
predicates.guard(user)

```

---


## Property aggergators

+ This is the only feature in this library that may work with the *JavaScript*

### `excludeProperties`

Excludes properties from given object. Mutates original object and returns mutated value. Return value will be type safe as with `Omit<T>`

```TypeScript
const user: User = {
    name: "Pedro",
    age: 17,
    cc: {
        code: "1231 2312 3132",
        cvv: 123
    }
}
/*
* {
*   name: "Pedro",
*   age: 17,
* }
*/
const userWithoutCC: Omit<User, "cc"> = excludeProperties(user)
```
---

### `pickProperties`

Opposite of `excludeProperties`, picks properties from original objects. Mutates original object and returns mutated value. Return value will be type safe as with `Pick<T>`

```TypeScript

const user: User = {
    name: "Pedro",
    age: 17,
    cc: {
        code: "1231 2312 3132",
        cvv: 123
    }
}
/*
* {
*   name: "Pedro",
*   age: 17,
* }
*/
const userWithoutCC: Pick<User, "age" | "name"> = pickProperties(user, "age", "name")



```
---
If you have ideas for enhanching TypeScript with assets similar to those or upgrading current functional, contact me by email or make pull request to this repo. If you are adding new assets and tests running on GitHub Actions are not completing, your PR will be never approved.

Made and documented by [**LCcodder**](https://github.com/LCcodder)
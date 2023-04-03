---

path: "/this-in-php-programming-language"

date: "2017-04-06T19:43:55.962Z"

title: "$THIS IN PHP PROGRAMMING"

tags: [development, php, oop]

draft: false

---



$this is a special variable, Its reffers to current object. To access a private or protected property we need this keyword for accessing them.

So, `$this ->` means current object.

Example:

```c
public function getProduct()
{
  return $this->type;
}
```



This function is reffering the ‘type’ property of the current object of `getProduct` method.



We use `->` operator for accessing an object’s property or method.

*Note 1: Method is just function inside of class.*

*Note 2: When we are accessing a property or method we should omit the ‘$’ (Dollar) sign.*



Thank you.
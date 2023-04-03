---

path: "/php-and-js-code-refactoring"

date: "2018-04-06T19:43:55.962Z"

title: "PHP AND JS CODE REFACTORING"

tags: [development, php, clean code, code refactoring]

draft: false

---

# **What is refactoring?**

The way we restructure our existing code without changing its behaviour.

We all need to restructure our ‘bad’ code better without changing underlying the functionality.

# **JS Code:**

Suppose I am making a game where there is two player, when the player 1 click a button the value is changed to some random number (between 0-10) , and the computer itself making a random number too.

For player 1:

```javascript
var max = 10;
var min = 3;
var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
this.monsterHealth -= damage;

if (this.monsterHealth <=0) {
	alert('You Won!');
	this.gameIsRunning = false;return;
 }
```

**For machine:**

Here I have same code repeating itself for two player.  We need to refactor this using

```javascript
var max = 12;
var min = 3;
var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
this.playerHealth -= damage;

if (this.playerHealth <=0) {
	alert('You Lost!');
	this.gameIsRunning = false;
	return;
}
```

Here I have same code repeating itself for two player.  We need to refactor this using

# **DON’T REPEAT YOURSELF (DRY) PRINCIPLE.**

We can refactor this code by creating a fuction. Take a look, We are doing two thing here.

1. Checking if a player is win or lost
2. Making an alert

We can create function which can do same thing for two player.

```javascript
checkWin() {
if (this.monsterHealth <=0) {
	if (confirm('You won! New game?')) {
		this.startGame();
     }else {
     	this.gameIsRunning = false;
     }
     return true;
   } else if (this.playerHealth <=0) {
   		if (confirm('You Lost! New game?')) {
   			this.startGame();
   		}else {
   		this.gameIsRunning = false;
   	}
   	return true;
   }
   return false;
  }
```
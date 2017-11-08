"use strict";

function Node(newData, newNext) {
    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new Node Object');
         return new Node();
    }
    // assign properties to self
    this.data = newData;
    this.next = newNext;

    this.clean = function() {
      this.data = null;
      this.next = null;
    }

    this.display = function() {
        console.log(this.data);
    };
    // return this
}


function Stack() {

  // this = {}
  if (new.target === undefined) {
       console.log('You didnt use new. Giving you a new Stack Object');
       return new Stack();
  }

  // assign properties to self
  this.head = null;
  this.insert = function(newData) {
      this.head = new Node(newData, this.head);
  };
  this.remove = function() {
    if(this.head == null) {
      console.log("Can't remove. Stack already empty");
      return;
    } else {
      var toRemove = this.head;
      this.head = this.head.next;
      return toRemove;
    }
  };
  this.print = function() {
      console.log("--- result ---");
      var iterator = this.head;
      while (iterator !== null) {
        iterator.display();
        iterator = iterator.next;
      }
      console.log("--------------");
  };
}

function Queue() {
  this.head = null;
  this.tail = null;

  this.insert = function(newData) {
    if (this.head === null && this.tail === null) {
        this.head = this.tail = new Node(newData, null);
    }  else {
      this.tail.next = new Node(newData, null);
      this.tail = this.tail.next;
    }
  };

  this.remove = function() {
    var toRemove;
    if (this.head == null && this.tail == null) {
      console.log("Can't remove. Queue is already empty");
    } else if (this.head === this.tail) {
      toRemove = this.head;
      this.head = this.tail = null;
      return toRemove;
    } else if(this.head != null) {
      toRemove = this.head;
      this.head = this.head.next;
      return toRemove;
    }
  };

  this.print = function() {
    console.log("--- result ---");
    var iterator = this.head;
    while(iterator !== null) {
      iterator.display();
      iterator = iterator.next;
    }
    console.log("--------------");
  };

}

/*
var myQueue = new Queue();
myQueue.insert("ricky");
myQueue.insert("evan");
myQueue.insert("Irving");
myQueue.insert("Tom");
myQueue.print();
myQueue.remove();
myQueue.remove();
myQueue.remove();
myQueue.print();
myQueue.remove();
myQueue.remove();
myQueue.print();
*/


var myStack = new Stack();
myStack.insert("ricky");
myStack.insert("lu Shang Xian");
myStack.insert("Cao Hai Shan");
myStack.insert("Scarlet");
myStack.insert("Wendy");
myStack.print();
myStack.remove();
myStack.remove();
myStack.remove();
myStack.remove();
myStack.remove();
myStack.remove();
myStack.print();

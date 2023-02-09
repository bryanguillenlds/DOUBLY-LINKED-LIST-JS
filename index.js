/*********
* LINKED LIST
*
* A list made of nodes. It is ordered but without indexes.
* Each node points to a previous el and a next el. 
*********/

//Class for a NODE
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

//Class for LinkedList Implementation
class DoublyLinkedList {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
      prev: null
    }

    //when the list is first created, we only have one node, so it is both the head and the tail.
    this.tail = head;

    this.length = 1;
  }

  //method to add a node at the end of the list.
  append(value) {
    const newNode = new Node(value);

    //assign the prev prop of the new node to point to the current tail
    //we do this BEFORE updating the tail to be the new node
    newNode.prev = this.tail;

    //the order matters here, we need to update the current tail's next-pointer first
    this.tail.next = newNode; //set the current tail to poin to the new node being appended
    this.tail = newNode; //now we can update the tail to be the new node

    this.length++; //increase length of list
  }

  //method to add a node at the begining of the list
  prepend(value) {
    const newNode = new Node(value);

    newNode.next = this.head; //point to current head
    this.head.prev = newNode; //make current head point to new node (new head)
    this.head = newNode; //make head be the newnode
    this.length++;
  }

  //Method to insert a node at a specific location
  insert(index, value) {
    //if we want to insert at index 0
    if (index === 0) {
      //prepend it
      this.prepend(value);
    }
    
    //if the index is more than the length...
    if (index >= this.length) {
      //add it to the end
      return this.append(value);
    }

    const newNode = new Node(value);

    //leader is the node that will point to our insertion
    const leader = this.traverseToIndex(index-1);
    //grab the pointer to the next (follower) BEFORE breaking reference with insertion
    const follower = leader.next;
    //link the leader with the newnode for insertion
    leader.next = newNode;
    //point prev of new node to the leader
    newNode.prev = leader;
    //make inserted node point to the next node (follower)
    newNode.next = follower;
    //make follower prev pointer point to the new node
    follower.prev = newNode;
    //increase the length
    this.length++;
  }

  //Method to remove a node from anywhere in the list
  remove(index) {
    let leader = this.traverseToIndex(index - 1); //grab leader (node before the one to be removed)
    let unwantedNode = leader.next; //grab node to be removed
    let follower = unwantedNode.next; //grab next of node to be removed
    leader.next = follower; //point leader to follower
    follower.prev = leader; //point follower's prev to leader
    this.length--; //decrease length

    //node will be deleted automatically by garbage collector because nothing is pointing to it
  }

  //Method to reverse list order
  reverse() {
    //if there is only one item...
    if(!this.head.next) {
      return this.head; //just return it
    }

    let first = this.head; //grab first item
    this.tail = this.head; //make tail be the head
    let second = first.next; //grab second item

    //loop as long as this node exists
    while(second) {
      const temp = second.next; //temp var to hold the item next to the second/current node
      
      second.next = first; //point the current/second node to the first
      first = second; //first item becomes the second
      second = temp; //second item becomes the item next to currend/second node
    }

    this.head.next = null; //point head to null
    this.head = first; //the head now is the first (which is the last item now after looping)
  }

  traverseToIndex(index) {
    let counter = 0;
    let currentNode = this.head; //node to start traversing

    //keep looping until we reach the index
    while(counter !== index) {
      currentNode = currentNode.next; //go to next node
      counter++; //increment counter
    }

    return currentNode;
  }

  //method to log the list as an arr for testing purposes
  logList() {
    const arr = [];
    let currentNode = this.head;

    while(currentNode !== null) {
      arr.push(currentNode);
      currentNode = currentNode.next;
    }

    return arr;
  }
}

const linkedList = new LinkedList(10);
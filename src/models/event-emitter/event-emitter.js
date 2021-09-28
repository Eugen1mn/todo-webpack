class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    // подписаться на событие
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(
      (eventCallback) => callback !== eventCallback,
    );
  }

  trigger(eventName, args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((cb) => {
        cb.call(null, args);
      });
    }
  }
}

// const ee = new EventEmitter();

// const sayHiHandler = () => {
//   console.log('Hello, Im hear');
// };

// ee.subscribe('change', sayHiHandler);

// ee.unsubscribe('change', sayHiHandler);

// ee.subscribe('change', sayHiHandler);

// ee.subscribe('change', sayHiHandler);

// ee.trigger('change');

export default EventEmitter;

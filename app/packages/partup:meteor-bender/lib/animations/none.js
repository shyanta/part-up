var None,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

None = (function() {
  function None(startCallback, endCallback) {
    this.removeElement = __bind(this.removeElement, this);
    this.insertElement = __bind(this.insertElement, this);
    this.startCallback = startCallback;
    this.endCallback = endCallback;
  }

  None.animations = ['none'];

  None.prototype.insertElement = function(node, next) {
    if(typeof this.startCallback === 'function') this.startCallback();
    return $(node).insertBefore(next);
  };

  None.prototype.removeElement = function(node) {
    if(typeof this.endCallback === 'function') this.endCallback();
    return $(node).remove();
  };

  return None;

})();

this.Bender.animations.push(None);
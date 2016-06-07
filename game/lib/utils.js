var utils = {
  centerGameObjects: function (objects) {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5);
    })
  },

  interleaveArrays: function(array1, array2) {
    return array1.reduce(function(arr, v, i) {
      return arr.concat(v, array2[i]);
    }, []);
  }
};



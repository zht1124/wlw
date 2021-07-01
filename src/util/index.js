function godata(arr) {
  arr.map((item) => {
    item.children
      ? item.children.map((item1) => {
          item1.children
            ? item1.children.map((item2) => {
                item2.children
                  ? item2.children.map((item3) => {
                      this.keyAll.push(item3.id);
                    })
                  : null;
              })
            : null;
        })
      : null;
  });
  return arr;
}

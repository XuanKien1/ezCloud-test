export function initData() {
  if (!localStorage.getItem('classes')) {
    localStorage.setItem('classes', JSON.stringify([
      { id: '1', parent: '11', name: 'A' },
      { id: '2', parent: '11', name: 'A1' },
      { id: '3', parent: '12', name: 'B' },
      { id: '4', parent: '12', name: 'C2' }
    ]));
  }

  if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify([
      { id: '101', name: 'Nguyễn Văn A', birthDate: '2005-01-01', age: 19, className: '11A' },
      { id: '102', name: 'Trần Thị B', birthDate: '2007-05-12', age: 17, className: '12B' }
    ]));
  }
}

import { XCircle } from 'react-bootstrap-icons';

export default function ConstraintList({constraints, buttons, toggleConstraint}) {

  const handleClick = event => {
    const id = event.target.closest('.constraintList-item').getAttribute('data-constraint-id');
    toggleConstraint(undefined, { id });
  }

  return (
    <div className="constraintList">
      {constraints && constraints.map(item => <div className="constraintList-item" onClick={handleClick} data-constraint-id={item.id} key={item.id}>
        {item.label}
        <div className="constraintList-item-icon">
          {buttons?.remove && (<XCircle onClick={handleClick} />)}
        </div>
      </div>)}
      {constraints.length === 0 && (<span className="constraintList-placeholder">Keywords will appear here</span>)}
    </div>    
  );
}
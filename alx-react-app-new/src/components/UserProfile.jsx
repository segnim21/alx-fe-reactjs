function UserProfile(props) {
  return (
    <div style={{border: '1px solid gray', padding: '10px', margin: '10px', }}>
      <h2 style={{color: 'blue'}}>{props.name}</h2>

<span style={{fontWeight: 'bold'}}><p>Age: {props.age}</p></span>      
      <p style={{fontStyle: 'italic'}}>Bio: {props.bio}</p>
    </div>
  );
}

export default UserProfile;

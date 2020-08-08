import React, { useState, useEffect } from 'react';

export default ({
  user, onSubmit, submitMessage = 'Add user', disabled = false,
}) => {
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCPF(user.cpf);
      setEmail(user.email);
      setPhoneNumber(user.phonenumber);
    }
  }, [user]);

  function submitForm(e) {
    e.preventDefault();
    onSubmit({
      name,
      cpf,
      email,
      phonenumber,
    });
  }

  return (
    <form onSubmit={submitForm}>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Name</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Jhon Doe"
                minLength="3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">CPF</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="0000000000"
                minLength="11"
                maxLength="11"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
                disabled={disabled}
                required
              />
            </div>
            <p className="help">Just numbers</p>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">E-Mail</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded">
              <input
                className="input"
                type="email"
                placeholder="jhondoe@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Phone Number</label>
        </div>
        <div className="field-body">
          <div className="field-body">
            <div className="field is-expanded">
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">+55</a>
                </p>
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="tel"
                    placeholder="83988886666"
                    minLength="11"
                    maxLength="11"
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={disabled}
                    required
                  />
                </p>
              </div>
              <p className="help">Do not enter the first zero</p>
            </div>
          </div>
        </div>
      </div>

      {!disabled ? (
        <div className="field is-horizontal">
          <div className="field-label" />
          <div className="field-body">
            <div className="field">
              <div className="control">
                <button className="button is-primary">{submitMessage}</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
};

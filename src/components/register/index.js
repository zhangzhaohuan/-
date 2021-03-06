import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class Demo extends Component {
  state = {
    checkNick: false,
  };

  check = () => {
    this.props.form.validateFields(
      { force: true },
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }

  handleChange = (e) => {
    this.setState({
      checkNick: e.target.checked,
    }, () => {
      this.props.form.getFieldsValue(['nickname'], { force: true });
    });
  }

  validateName = (rule, value, callback) => {
    console.log(rule);
    console.log(value);
    const { getFieldsValue } = this.props.form;
    console.log(getFieldsValue(['nickname']));

    if (value === getFieldsValue(['nickname']).nickname) {
      callback('name和nickname相同');
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem {...formItemLayout} label="Name">
          {getFieldDecorator('username', {
            validateFirst: true,
            rules: [
              {
                required: true,
                message: 'Please input your name',
              },
              {
                validator: this.validateName,
              }
            ],
          })(
            <Input placeholder="Please input your name" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Nickname">
          {getFieldDecorator('nickname', {
            rules: [{
              required: true,
              message: 'Please input your nickname',
            }],
          })(
            <Input placeholder="Please input your nickname" />
          )}
        </FormItem>
        {/* <FormItem {...formTailLayout}>
          <Checkbox
            checked={this.state.checkNick}
            onChange={this.handleChange}
          >
            Nickname is required
          </Checkbox>
        </FormItem> */}
        <FormItem {...formTailLayout}>
          <Button type="primary" onClick={this.check}>
            Check
          </Button>
        </FormItem>
      </div>
    )
  }
}

const WrappedDemo = Form.create()(Demo);
export default WrappedDemo
// 이전에는 npm validation을 사용했지만 지금 프로젝트에선 joi 사용
const Joi =  require('joi');

module.exports = {
    // validateBody method 생성 전달 파라미터로 schema를 받는다.
    validateBody: (schema) => {
        return (req, res, next) => {

            const result = Joi.validate(req.body, schema);
            // 결과 값에 에러가 있을 시 
            if (result.error) {
                return res.status(400).json(result.error);
            }
            // req로 넘어온 value 속성이 없다면
            if (!req.value) {
                // req안에 value 속성 추가
                req.value = {};
            }

            // 생성된 value속성에 body의 속성 result.value 값 할당
            // 즉 req.value.body와 같은 형태
            // value: { body: { email: 'a1@test.com', password: '123456' } }
            req.value['body'] = result.value;
            console.log(req);
            next();
        }
    },
    /**
     * 실질적인 validation이 이루어지는 schemas 객체
     * user router에서 validateBody(schemas.authSchema)로 값 확인하여
     * validateBody(schema)의 schema인자로 호출
     */
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
};

import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const payOrderEmailTemplate = (order) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>New email template 2023-01-18</title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      [data-ogsb] .es-button {
        border-width: 0 !important;
        padding: 10px 20px 10px 20px !important;
      }
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120%;
        }
        h1 {
          font-size: 30px !important;
          text-align: center;
        }
        h2 {
          font-size: 26px !important;
          text-align: center;
        }
        h3 {
          font-size: 20px !important;
          text-align: center;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 26px !important;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
        }
        .es-menu td a {
          font-size: 12px !important;
        }
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 14px !important;
        }
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }
        *[class='gmail-fix'] {
          display: none !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-button-border {
          display: block !important;
        }
        a.es-button,
        button.es-button {
          font-size: 20px !important;
          display: block !important;
          border-left-width: 0px !important;
          border-right-width: 0px !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-m-p0 {
          padding: 0 !important;
        }
        .es-m-p0r {
          padding-right: 0 !important;
        }
        .es-m-p0l {
          padding-left: 0 !important;
        }
        .es-m-p0t {
          padding-top: 0 !important;
        }
        .es-m-p0b {
          padding-bottom: 0 !important;
        }
        .es-m-p20b {
          padding-bottom: 20px !important;
        }
        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }
        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }
        tr.es-desk-hidden {
          display: table-row !important;
        }
        table.es-desk-hidden {
          display: table !important;
        }
        td.es-desk-menu-hidden {
          display: table-cell !important;
        }
        .es-menu td {
          width: 1% !important;
        }
        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }
        table.es-social {
          display: inline-block !important;
        }
        table.es-social td {
          display: inline-block !important;
        }
        .es-m-p5 {
          padding: 5px !important;
        }
        .es-m-p5t {
          padding-top: 5px !important;
        }
        .es-m-p5b {
          padding-bottom: 5px !important;
        }
        .es-m-p5r {
          padding-right: 5px !important;
        }
        .es-m-p5l {
          padding-left: 5px !important;
        }
        .es-m-p10 {
          padding: 10px !important;
        }
        .es-m-p10t {
          padding-top: 10px !important;
        }
        .es-m-p10b {
          padding-bottom: 10px !important;
        }
        .es-m-p10r {
          padding-right: 10px !important;
        }
        .es-m-p10l {
          padding-left: 10px !important;
        }
        .es-m-p15 {
          padding: 15px !important;
        }
        .es-m-p15t {
          padding-top: 15px !important;
        }
        .es-m-p15b {
          padding-bottom: 15px !important;
        }
        .es-m-p15r {
          padding-right: 15px !important;
        }
        .es-m-p15l {
          padding-left: 15px !important;
        }
        .es-m-p20 {
          padding: 20px !important;
        }
        .es-m-p20t {
          padding-top: 20px !important;
        }
        .es-m-p20r {
          padding-right: 20px !important;
        }
        .es-m-p20l {
          padding-left: 20px !important;
        }
        .es-m-p25 {
          padding: 25px !important;
        }
        .es-m-p25t {
          padding-top: 25px !important;
        }
        .es-m-p25b {
          padding-bottom: 25px !important;
        }
        .es-m-p25r {
          padding-right: 25px !important;
        }
        .es-m-p25l {
          padding-left: 25px !important;
        }
        .es-m-p30 {
          padding: 30px !important;
        }
        .es-m-p30t {
          padding-top: 30px !important;
        }
        .es-m-p30b {
          padding-bottom: 30px !important;
        }
        .es-m-p30r {
          padding-right: 30px !important;
        }
        .es-m-p30l {
          padding-left: 30px !important;
        }
        .es-m-p35 {
          padding: 35px !important;
        }
        .es-m-p35t {
          padding-top: 35px !important;
        }
        .es-m-p35b {
          padding-bottom: 35px !important;
        }
        .es-m-p35r {
          padding-right: 35px !important;
        }
        .es-m-p35l {
          padding-left: 35px !important;
        }
        .es-m-p40 {
          padding: 40px !important;
        }
        .es-m-p40t {
          padding-top: 40px !important;
        }
        .es-m-p40b {
          padding-bottom: 40px !important;
        }
        .es-m-p40r {
          padding-right: 40px !important;
        }
        .es-m-p40l {
          padding-left: 40px !important;
        }
        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important;
        }
      }
    </style>
  </head>
  <body
    style="
      width: 100%;
      font-family: helvetica, 'helvetica neue', arial, verdana, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div class="es-wrapper-color" style="background-color: #1e2021">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#1e2021"></v:fill>
        </v:background>
      <![endif]-->
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
          background-color: #1e2021;
        "
      >
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-header"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    class="es-header-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        class="esdev-adapt-off"
                        align="left"
                        bgcolor="#335c67"
                        style="
                          padding: 20px;
                          margin: 0;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="esdev-mso-table"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            width: 560px;
                          "
                        >
                          <tr>
                            <td
                              class="esdev-mso-td"
                              valign="top"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    class="es-m-p0r"
                                    valign="top"
                                    align="center"
                                    style="padding: 0; margin: 0; width: 415px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 0px;
                                          "
                                        >
                                          <img
                                            class="adapt-img"
                                            src="images/logonobackground.png"
                                            alt
                                            style="
                                              display: block;
                                              border: 0;
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                            "
                                            width="340"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="padding: 0; margin: 0; width: 20px"></td>
                            <td
                              class="esdev-mso-td"
                              valign="top"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                align="right"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 125px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            display: none;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        bgcolor="#335c67"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        line-height: 36px;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        font-size: 30px;
                                        font-style: normal;
                                        font-weight: bold;
                                        color: #f5b700;
                                      "
                                    >
                                      Your order is on its way!
                                    </h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: helvetica, 'helvetica neue',
                                          arial, verdana, sans-serif;
                                        line-height: 21px;
                                        color: #f7f9f9;
                                        font-size: 14px;
                                      "
                                    >
                                      Hi ${order.shippingAddress.fullName},<br /><br />
                                      We’re getting your order ready. <br />
                                      We wish you enjoy shopping with us and
                                      hope to see you again real soon!
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        bgcolor="#335c67"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <h2
                                      style="
                                        margin: 0;
                                        line-height: 36px;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        font-size: 24px;
                                        font-style: normal;
                                        font-weight: bold;
                                        color: #f5b700;
                                      "
                                    >
                                      ${order._id}
                                    </h2>
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: helvetica, 'helvetica neue',
                                          arial, verdana, sans-serif;
                                        line-height: 21px;
                                        color: #f5b700;
                                        font-size: 14px;
                                      "
                                    >
                                      ${order.createdAt.toString().substring(0,
                                      10)}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    class="es-m-txt-c"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 20px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: helvetica, 'helvetica neue',
                                          arial, verdana, sans-serif;
                                        line-height: 21px;
                                        color: #f5b700;
                                        font-size: 14px;
                                      "
                                    >
                                      ITEMS ORDERED
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      border="0"
                                      width="100%"
                                      height="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            border-bottom: 1px solid #a0937d;
                                            background: none;
                                            height: 1px;
                                            width: 100%;
                                            margin: 0px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- ---------------------------------------------------------------------------------------------PRODUCT INFO START -->
                    ${order.orderItems .map( (item) => `
                    <tr>
                      <td
                        class="esdev-adapt-off"
                        align="left"
                        bgcolor="#335c67"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="esdev-mso-table"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            width: 560px;
                          "
                        >
                          <tr>
                            <td
                              class="esdev-mso-td"
                              valign="top"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 125px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            font-size: 0px;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://viewstripo.email"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #926b4a;
                                              font-size: 14px;
                                            "
                                            ><img
                                              class="adapt-img p_image"
                                              src="{${item.image}}"
                                              alt="Marshall Monitor"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                              width="125"
                                              title="Marshall Monitor"
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="padding: 0; margin: 0; width: 20px"></td>
                            <td
                              class="esdev-mso-td"
                              valign="top"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 125px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          class="es-m-p0t es-m-p0b es-m-txt-l"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-top: 20px;
                                            padding-bottom: 20px;
                                          "
                                        >
                                          <h3
                                            style="
                                              margin: 0;
                                              line-height: 24px;
                                              mso-line-height-rule: exactly;
                                              font-family: arial,
                                                'helvetica neue', helvetica,
                                                sans-serif;
                                              font-size: 20px;
                                              font-style: normal;
                                              font-weight: bold;
                                              color: #f7f9f9;
                                            "
                                          >
                                            <strong class="p_name"
                                              >${item.name}</strong
                                            >
                                          </h3>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="padding: 0; margin: 0; width: 20px"></td>
                            <td
                              class="esdev-mso-td"
                              valign="top"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 176px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="right"
                                          class="es-m-p0t es-m-p0b"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-top: 20px;
                                            padding-bottom: 20px;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              font-family: helvetica,
                                                'helvetica neue', arial, verdana,
                                                sans-serif;
                                              line-height: 21px;
                                              color: #f7f9f9;
                                              font-size: 14px;
                                            "
                                            class="p_description"
                                          >
                                            ${item.quantity}
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="padding: 0; margin: 0; width: 20px"></td>
                            <td
                              class="esdev-mso-td"
                              valign="top"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-right"
                                align="right"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: right;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 74px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="right"
                                          class="es-m-p0t es-m-p0b"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-top: 20px;
                                            padding-bottom: 20px;
                                          "
                                        >
                                          <p
                                            class="p_price"
                                            style="
                                              margin: 0;
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              font-family: helvetica,
                                                'helvetica neue', arial, verdana,
                                                sans-serif;
                                              line-height: 21px;
                                              color: #f7f9f9;
                                              font-size: 14px;
                                            "
                                          >
                                            ₱${item.price.toFixed(2)}
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    ` ) .join('\n')}
                    <!-- -------------------------------------------------------------------------------------------------------------------------------------------------PRODUCT INFO END -->

                    <tr>
                      <td
                        align="left"
                        bgcolor="#335c67"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                      font-size: 0;
                                    "
                                    bgcolor="#335c67"
                                  >
                                    <table
                                      border="0"
                                      width="100%"
                                      height="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            border-bottom: 1px solid #a0937d;
                                            background: none;
                                            height: 1px;
                                            width: 100%;
                                            margin: 0px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="esdev-adapt-off"
                        align="left"
                        bgcolor="#335c67"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="esdev-mso-table"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            width: 560px;
                          "
                        >
                          <tr>
                            <td
                              class="esdev-mso-td"
                              valign="top"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 466px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="right"
                                          style="padding: 0; margin: 0"
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              font-family: helvetica,
                                                'helvetica neue', arial, verdana,
                                                sans-serif;
                                              line-height: 21px;
                                              color: #f7f9f9;
                                              font-size: 14px;
                                            "
                                          >
                                            Subtotal<br />VAT<br />Shipping<br /><b
                                              >Total</b
                                            >
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="padding: 0; margin: 0; width: 20px"></td>
                            <td
                              class="esdev-mso-td"
                              valign="top"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-right"
                                align="right"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: right;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 74px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="right"
                                          style="padding: 0; margin: 0"
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              font-family: helvetica,
                                                'helvetica neue', arial, verdana,
                                                sans-serif;
                                              line-height: 21px;
                                              color: #f7f9f9;
                                              font-size: 14px;
                                            "
                                          >
                                            ₱${order.itemsPrice.toFixed(2)}<br />₱${order.taxPrice.toFixed(2)}<br />₱${order.shippingPrice.toFixed(2)}<br /><strong
                                              >₱${order.totalPrice.toFixed(2)}</strong
                                            >
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        bgcolor="#335c67"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    class="es-m-txt-c"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 20px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: helvetica, 'helvetica neue',
                                          arial, verdana, sans-serif;
                                        line-height: 21px;
                                        color: #f5b700;
                                        font-size: 14px;
                                      "
                                    >
                                      SHIPPING ADDRESS
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      border="0"
                                      width="100%"
                                      height="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            border-bottom: 1px solid #a0937d;
                                            background: none;
                                            height: 1px;
                                            width: 100%;
                                            margin: 0px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0"
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: helvetica, 'helvetica neue',
                                          arial, verdana, sans-serif;
                                        line-height: 21px;
                                        color: #f7f9f9;
                                        font-size: 14px;
                                      "
                                    >
                                      ${order.shippingAddress.fullName},<br />
                                      ${order.shippingAddress.address},<br />
                                      ${order.shippingAddress.city},<br />
                                      ${order.shippingAddress.country},<br />
                                      ${order.shippingAddress.postalCode}<br />
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        bgcolor="#335c67"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          padding-top: 30px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      border="0"
                                      width="100%"
                                      height="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            border-bottom: 1px solid #999999;
                                            background: none;
                                            height: 1px;
                                            width: 100%;
                                            margin: 0px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                    "
                                  >
                                    <h2
                                      style="
                                        margin: 0;
                                        line-height: 29px;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        font-size: 24px;
                                        font-style: normal;
                                        font-weight: bold;
                                        color: #f5b700;
                                      "
                                    >
                                      <b>Any Questions?</b>
                                    </h2>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: helvetica, 'helvetica neue',
                                          arial, verdana, sans-serif;
                                        line-height: 21px;
                                        color: #f7f9f9;
                                        font-size: 14px;
                                      "
                                    >
                                      Email us at
                                      <a
                                        href="mailto:urbanread@outlook.ph"
                                        style="
                                          text-decoration: none;
                                          color: #d34e24;
                                        "
                                        ><strong
                                          >urbanread@outlook.ph</strong
                                        ></a
                                      >
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#1e2021"
                  style="padding: 0; margin: 0; background-color: #1e2021"
                >
                  <table
                    bgcolor="#fef8ed"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #fef8ed;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        class="es-m-p10r es-m-p10l"
                        align="left"
                        bgcolor="#335c67"
                        style="
                          margin: 0;
                          padding-top: 15px;
                          padding-bottom: 15px;
                          padding-left: 20px;
                          padding-right: 20px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td style="padding: 0; margin: 0">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      class="es-menu"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr class="links-images-left">
                                        <td
                                          align="center"
                                          valign="top"
                                          width="33.33%"
                                          id="esd-menu-id-0"
                                          style="
                                            margin: 0;
                                            padding-left: 5px;
                                            padding-right: 5px;
                                            padding-top: 10px;
                                            padding-bottom: 10px;
                                            border: 0;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://urbanread.space"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: none;
                                              display: block;
                                              font-family: helvetica,
                                                'helvetica neue', arial, verdana,
                                                sans-serif;
                                              color: #a0937d;
                                              font-size: 14px;
                                            "
                                            ><img
                                              src="https://drive.google.com/uc?export=view&id=
                                            1yCCq5oXA-Cpw5bN4d1AmqHdBbqF5_gIV
                                            "
                                              alt="FREE DELIVERY"
                                              title="FREE DELIVERY"
                                              align="absmiddle"
                                              width="25"
                                              style="
                                                display: inline-block !important;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                                padding-right: 15px;
                                                vertical-align: middle;
                                              "
                                            />FREE DELIVERY</a
                                          >
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          width="33.33%"
                                          style="
                                            margin: 0;
                                            padding-left: 5px;
                                            padding-right: 5px;
                                            padding-top: 10px;
                                            padding-bottom: 10px;
                                            border: 0;
                                            border-left: 1px solid #a0937d;
                                          "
                                          id="esd-menu-id-1"
                                        >
                                          <a
                                            target="_blank"
                                            href="https://urbanread.space"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: none;
                                              display: block;
                                              font-family: helvetica,
                                                'helvetica neue', arial, verdana,
                                                sans-serif;
                                              color: #a0937d;
                                              font-size: 14px;
                                            "
                                            ><img
                                              src="https://drive.google.com/uc?export=view&id=
                                            1so2v6raTOlC3nd0Ym5TjH-TNveHBvjjp
                                            "
                                              alt="HIGH QUALITY"
                                              title="HIGH QUALITY"
                                              align="absmiddle"
                                              width="25"
                                              style="
                                                display: inline-block !important;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                                padding-right: 15px;
                                                vertical-align: middle;
                                              "
                                            />HIGH QUALITY</a
                                          >
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          width="33.33%"
                                          style="
                                            margin: 0;
                                            padding-left: 5px;
                                            padding-right: 5px;
                                            padding-top: 10px;
                                            padding-bottom: 10px;
                                            border: 0;
                                            border-left: 1px solid #a0937d;
                                          "
                                          id="esd-menu-id-2"
                                        >
                                          <a
                                            target="_blank"
                                            href="https://urbanread.space"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: none;
                                              display: block;
                                              font-family: helvetica,
                                                'helvetica neue', arial, verdana,
                                                sans-serif;
                                              color: #a0937d;
                                              font-size: 14px;
                                            "
                                            ><img
                                              src="https://drive.google.com/uc?export=view&id=
                                            1kv1afhq0hdXXMw7tv-xWgM9jub2BBECx
                                            "
                                              alt="BEST CHOICE"
                                              title="BEST CHOICE"
                                              align="absmiddle"
                                              width="25"
                                              style="
                                                display: inline-block !important;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                                padding-right: 15px;
                                                vertical-align: middle;
                                              "
                                            />BEST CHOICE</a
                                          >
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: #e3cdc1;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#1e2021"
                  style="padding: 0; margin: 0; background-color: #1e2021"
                >
                  <table
                    class="es-footer-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: transparent;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        bgcolor="#335c67"
                        style="
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          padding-top: 30px;
                          padding-bottom: 30px;
                          background-color: #335c67;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-table-not-adapt es-social"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 20px;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://www.facebook.com/urbanURread"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #926b4a;
                                              font-size: 14px;
                                            "
                                            ><img
                                              title="Facebook"
                                              src="https://drive.google.com/uc?export=view&id=
                                              1UVsWAOYRZW0mu30WCz6-MbEPckfLiRO2
                                              "
                                              alt="Fb"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                          /></a>
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 20px;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://twitter.com/urban_read"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #926b4a;
                                              font-size: 14px;
                                            "
                                            ><img
                                              title="Twitter"
                                              src="https://drive.google.com/uc?export=view&id=
                                              17HpmD8VPFWPeQ2oi_HONMGxrehjIRBLX
                                              "
                                              alt="Tw"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: helvetica, 'helvetica neue',
                                          arial, verdana, sans-serif;
                                        line-height: 18px;
                                        color: #f7f9f9;
                                        font-size: 12px;
                                      "
                                    >
                                      You are receiving this email because you
                                      have visited our site or asked us about
                                      the regular newsletter. Make sure our
                                      messages get to your Inbox (and not your
                                      bulk or junk folders).<br />
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>

  `;
};

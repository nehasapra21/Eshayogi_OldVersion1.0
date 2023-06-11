import React, { Component } from "react";
import api from "../../utils/api";

import Header from "../header/Header";

import "../PrivacyPolicy/Policy.css";

class UserAgreement extends Component {
  constructor(props) {
    super(props);
    const { status, org } = JSON.parse(
      localStorage.getItem("eSahyogiUser")
    ).data;
    this.state = {
      status,
      org,
    };
  }
  handleIAgree() {
    api.iAgree().then(
      (response) => {
        if (response.ok) {
          this.props.history.push({
            pathname: "/home",
            state: { data: this.state.org },
          });
        } else {
          console.log("something error occured ", response);
        }
      },
      (err) => {
        console.log("err is", err);
      }
    );
  }
  render() {
    return (
      <div className="BackgroundHomeframe">
        <Header />
        <div
          className="container agreementContainer"
          style={{ paddingBottom: "150px" }}
        >
          <div className="agreementHeader">
            <h1 className="agreementHead">eSahyogi User Agreement</h1>
          </div>
          <div className="agreementInfo">
            <p className="info">
              The eSahyogi User Agreement (“Terms”) applies to your access to
              and use of the websites,mobile apps, widgets, and other online
              products and services (collectively “Services”) provided by
              eSahyogi Platform or The Ideaz Factory (“eSahyogi”, “we” or “us”).
              By accessing or using our Services, you agree to be bound by these
              Terms and the Privacy Policy. If you do not agree to these Terms
              or Privacy Policy, you may not access or use our Services.
            </p>
            <ol className="agreementPoints">
              <li className="pointHead">Access of Service</li>
              <p className="info">
                Children under the age of 18 years are not allowed to create an
                account or otherwise us the Services. Any guardian who creates
                an account for such persons below the age of 18 years, shall be
                solely responsible for the actions made thereunder. If you are
                accepting these Terms on behalf of another legal entity,
                including a business or a government, you represent that you
                have full legal authority to bind such entity to these Terms.
              </p>
              <li className="pointHead">Use of Service</li>
              <p className="info">
                eSahyogi grant you a personal, non-transferable, non-exclusive,
                revocable, limited license to use and access the Services solely
                as permitted by these Terms. We reserve all rights not expressly
                granted to you by these Terms. Except as permitted through the
                Services or as otherwise permitted by us in writing, your
                license does not include the right to:
              </p>
              <ol className="infoList">
                <li className="info">
                  License, sell, transfer, assign, distribute, host, or
                  otherwise commercially exploit the Services;
                </li>
                <li className="info">
                  Modify, prepare derivative works of, disassemble, decompile or
                  reverse engineer any part of the Services;
                </li>
                <li className="info">
                  Access the Services in order to build a similar or competitive
                  website, product, or service
                </li>
              </ol>
              <p className="info">
                We reserve the right to modify, suspend, or discontinue the
                Services (in whole or in part) at any time, with or without
                notice to you. Any future release, update, or other addition to
                functionality of the Services will be subject to these Terms,
                which may be updated from time to time. You agree that we will
                not be liable to you or to any third party for any modification,
                suspension, or discontinuation of the Services or any part
                thereof.
              </p>
              <li className="pointHead">Amount and Security</li>
              <p className="info">
                To use certain features of our Services, you may be required to
                create an eSahyogi account (an “Account”) and provide us with a
                username, password and certain other information about yourself
                as set forth in the Privacy Policy
                <br />
                You are solely responsible for the information associated with
                Your Account and anything that happens related to Your Account.
                You must maintain the security of your Account and promptly
                notify eSahyogi if you discover or suspect that someone has
                accessed your Account without your permission. We recommend that
                you use a strong password that is used only with the Services.
                <br />
                You will not license, sell, or transfer your Account without our
                prior written approval.
              </p>
              <li className="pointHead">Prohibited Activities</li>
              <p className="info">
                When accessing or using the Services, you must respect others
                and their rights including these Terms, so that we all may
                continue to use and enjoy the Services. We support the
                responsible reporting of security vulnerabilities. When
                accessing or using our Services, you shall not:
              </p>
              <li className="pointHead">
                Subscriptions and Payment Information
              </li>
              <p className="info">
                The use of our Services may require paid subscription. When
                purchasing such paid subscription, you agree that you are
                authorizing recurring payments and that payments will be made to
                eSahyogi by the method and at the recurring intervals you have
                agreed to, until the subscription for such Services is
                terminated by you or eSahyogi.
                <br />
                <br />
                If your debit card, credit card or other payment information{" "}
                <span style={{ fontWeight: "700" }}>
                  (“Payment Information”)
                </span>{" "}
                is declined for payment of the subscription of our Services, you
                must provide new Payment Information or your subscription will
                be cancelled. If you provide new Payment Information and are
                successfully charged, your new subscription period will be based
                on the original renewal date and not the date of the successful
                charge. You may cancel the subscription any time before the end
                of the current billing period and the cancellation will take
                effect on the next billing period. Your subscription will remain
                active from the time you cancel until the start of the next
                billing period and you will not receive a refund or credit for
                any remaining days in your current billing period.
                <br />
                <br />
                UNLESS YOU NOTIFY US BEFORE A CHARGE THAT YOU WANT TO CANCEL OR
                DO NOT WANT TO AUTO RENEW, YOU UNDERSTAND THAT YOUR SUBSCRIPTION
                WILL AUTOMATICALLY CONTINUE AND YOU AUTHORIZE US (WITHOUT NOTICE
                TO YOU, UNLESS REQUIRED BY APPLICABLE LAW) TO COLLECT THE THEN
                APPLICABLE SUBSCRIPTION FEE AND ANY TAXES, USING YOUR PAYMENT
                INFORMATION.
                <br />
                <br />
                We use third-party services providers to process Payment
                Information. If you submit your Payment information, you agree
                to pay all costs that you incur and you give us permission to
                charge you when the payment is due for an amount that includes
                these costs and any applicable taxes and fees.
              </p>
              <li className="pointHead">Idemnity</li>
              <p className="info">
                Except to the extent prohibited by law, you agree to defend,
                indemnify, and hold us, our licensors, our third party service
                providers and our officers, employees, licensors, and agents
                (the “eSahyogi Entities”) harmless, including costs and
                advocate’s fees, from any claim or demand made by any third
                party due to or arising out of (a) your use of the Services, (b)
                your violation of these Terms, (c) your violation of applicable
                laws or regulations. We reserve the right to control the defence
                of any matter for which you are required to indemnify us, and
                you agree to cooperate with our defence of these claims
              </p>
              <li className="pointHead">Disclaimers</li>
              <p className="info">
                The Services are provided "as is" and "as available" without
                warranties of any kind, either express or implied, including,
                but not limited to, implied warranties of merchantability,
                fitness for a particular purpose, and non-infringement. We, our
                licensors, and our third party service providers do not warrant
                that the Services are accurate, complete, reliable, current, or
                error free. While eSahyogi attempts to make your access to and
                use of our Services safe, we do not represent or warrant that
                our Services or servers are free of viruses or other harmful
                components.
              </p>
              <li className="pointHead">Limitation of Liability</li>
              <p className="info">
                In no event and under no theory of liability, including
                contract, tort, negligence, strict liability, warranty or
                otherwise, will eSahyogi Entities be liable to you for any
                indirect, consequential, exemplary, incidental, special or
                punitive damages, or lost profits arising from or relating to
                these Terms or the Services. Use of our Services is at your own
                discretion and risk and you will be solely responsible for any
                damage to your device, or computer system, or loss of data
                resulting therefrom. In no event will the aggregate liability of
                eSahyogi Entities exceed the any amount you paid eSahyogi in the
                previous six months for the Services giving rise to the claim.
                The limitations of this section will apply to any theory of
                liability, including those based on warranty, contract, statute,
                tort (including negligence) or otherwise, and even if the
                eSahyogi entities have been advised of the possibility of any
                such damage and even if any remedy set forth therein is found to
                have failed its essential purpose. The foregoing limitation of
                liability will apply to the fullest extent permitted by law in
                the applicable jurisdiction.
              </p>
              <li className="pointHead">Governing Law and Jurisdiaction</li>
              <p className="info">
                Any claims arising out of or relating to these Terms or the
                Services will be governed by the laws of Republic of India; all
                disputes related to these Terms or the Services will be brought
                solely in the courts of Chandigarh, India and you consent to
                personal jurisdiction in these courts.
              </p>
              <li className="pointHead">Changes to these Terms</li>
              <p className="info">
                We may make changes to these Terms from time to time. If we make
                changes, we will post the amended Terms to our Services and
                update the Effective Date above. If the changes, in our sole
                discretion, are material, we may also notify you by sending an
                email to the address associated with your Account (if you have
                chosen to provide an email address) or by otherwise providing
                notice through our Services. By continuing to access or use the
                Services on or after the Effective Date of the revised Terms,
                you agree to be bound by the revised Terms. If you do not agree
                to the revised Terms, you must stop accessing and using our
                Services before the changes become effective.
              </p>
              <li className="pointHead">Termination</li>
              <p className="info">
                You may terminate these Terms at any time and for any reason by
                deleting your Account and discontinuing your use of all
                Services. If you stop using the Services without deactivating
                your Accounts, your Accounts may be deactivated due to prolonged
                inactivity.
                <br />
                We may suspend or terminate your Accounts, or ability to access
                or use the Services at any time for any or no reason, including
                for a violation of these Terms.
                <br />
                The following sections will survive any termination of these
                Terms or of your Accounts: 4 (Prohibited Activities), 6
                (Indemnity), 7 (Disclaimers), 8 (Limitation of Liability), 9
                (Governing Law and Jurisdiction), 11 (Termination), and 12
                (Miscellaneous).
              </p>
              <li className="pointHead">Miscellaneous</li>
              <p className="info">
                These Terms constitute the entire agreement between you and us
                regarding your access to and use of the Services. Our failure to
                exercise or enforce any right or provision of these Terms will
                not operate as a waiver of such right or provision. If any
                provision of these Terms is, for any reason, held to be illegal,
                invalid or unenforceable, the rest of the Terms will remain in
                effect. You may not assign or transfer any of your rights or
                obligations under these Terms without our consent. We may freely
                assign these Terms.
                <br />
                <br />
              </p>
            </ol>
            <p className="pointHead">Contact Information</p>
            <p className="info">
              If you have any questions about this Privacy Policy, please
              contact us at <b>accounts@theideazfactory.com</b>
              <br />
            </p>
            <br></br>
            <b>
              <p className="info">The Ideaz Factory,</p>
              <p className="info">SCO 34, Second Floor,</p>
              <p className="info">Madhya Marg, Sector 26,</p>
              <p className="info">Chandigarh.</p>
            </b>
          </div>
        </div>
        {this.state.status == "PENDING" ? (
          <button
            type="button"
            className="PrintBtn UpdateButton"
            onClick={() => {
              this.handleIAgree();
            }}
          >
            I Agree
          </button>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default UserAgreement;
